"use server";

import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { dbConnect } from "@/lib/db";
import { Post, PostType } from "@/models/post";
import { TActionResponse } from "@/types/Type";
import { UpdateSchema } from "@/validations/validationSchema";
import { revalidatePath } from "next/cache";

export const submitAction = async (formData: FormData) => {
  try {
    const dropzoneFile = formData.get("dropzoneFile");
    const caption = formData.get("caption");

    // Validate file and caption
    if (!(dropzoneFile instanceof File)) {
      throw new Error("Uploaded file is invalid or missing.");
    }
    if (!caption || typeof caption !== "string") {
      throw new Error("Caption is required.");
    }

    // File type and size validation (example: max 5MB, only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(dropzoneFile.type)) {
      throw new Error("Only image files (jpeg, png, webp, gif) are allowed.");
    }
    if (dropzoneFile.size > maxSize) {
      throw new Error("File size exceeds 5MB limit.");
    }

    await dbConnect();

    // Convert file to buffer
    const fileBuffer = Buffer.from(await dropzoneFile.arrayBuffer());

    // Upload directly using Cloudinary's upload_stream for better performance
    const streamUpload = (buffer: Buffer) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "nextjs_gallery",
            resource_type: "image",
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("No result from Cloudinary upload."));
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const uploadedImage = await streamUpload(fileBuffer);

    if (!uploadedImage?.secure_url || !uploadedImage?.public_id) {
      throw new Error("Cloudinary did not return image URL or public ID");
    }

    const newPost = new Post<PostType>({
      caption,
      image: {
        secure_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
    });

    await newPost.save();
    revalidatePath("/", "page");
    console.log("Image and caption uploaded successfully.");
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong. Try again later."
    );
  }
};

export const getAction = async () => {
  await dbConnect();

  const data = await Post.find();
  console.log("get data" + data);
  return data;
};

export const getActionById = async (id: string) => {
  try {
    const data = await Post.findById(id);
    console.log(data);

    if (!data) throw new Error("No post is found with this id.");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAction = async (
  _prevState: TActionResponse,
  formData: FormData
): Promise<TActionResponse> => {
  const parsedData = UpdateSchema.safeParse({
    id: formData.get("id"),
    caption: formData.get("caption"),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Validation Failed",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { id, caption } = parsedData.data;

  try {
    await dbConnect();

    const data = await Post.findByIdAndUpdate(id, { caption }, { new: true });
    console.log(data);

    revalidatePath("/", "page");
    return {
      success: true,
      message: "Caption updated successfully",
      data: { id, caption },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update caption",
    };
  }
};

export const deleteAction = async (formData: FormData):Promise<TActionResponse> => {
  try {
    const id = formData.get('id')

    dbConnect();
    const data = await Post.findByIdAndDelete(id)
    console.log(data);
    
    revalidatePath('/', 'page')
    return{
      success: true,
      message: 'Post deleted successfully.'
    }
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to delete post.'
    }
  }
};
