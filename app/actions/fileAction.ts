"use server";

import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import { Post, PostType } from "@/models/post";
import { revalidatePath } from "next/cache";

export const submitAction = async (formData: FormData) => { 
  console.log("Form data are"+ formData);
   
  try {
    const dropzoneFile = formData.get("dropzoneFile") as File;
    const caption = formData.get("caption");

    // Type check
    if (!(dropzoneFile instanceof File)) {
      throw new Error("Uploaded file is invalid.")
    }

    if (!caption || typeof caption !== "string") {
      throw new Error("Caption is required.")
    }

    await dbConnect();

    const fileBuffer = Buffer.from(await dropzoneFile.arrayBuffer());
    const base64String = fileBuffer.toString("base64");

    const uploadedImage = await cloudinary.uploader.upload(
      `data:${dropzoneFile.type};base64,${base64String}`,
      {
        folder: "nextjs_gallery", // optional folder
      }
    );

    console.log("Uploaded image data are:", uploadedImage);

    const { secure_url, public_id } = uploadedImage;

    if (!secure_url || !public_id) {
      throw new Error("Cloudinary did not return image URL or public ID");
    }

    
    const newPost = new Post<PostType>({
      caption,
      image: {
        secure_url,
        public_id,
      },
    });

    console.log("New post", newPost);
    
    await newPost.save();
    
    // Perform mutation
    revalidatePath("/", "page")

    console.log("Image and caption uploaded successfully.")

  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Try again later.")

  }
};

export const getAction = async () => {
  await dbConnect();

  const data = await Post.find();
  console.log("get data"+data);
  return data;
};

export const getActionById = async ({params}:{params:{id: string}})=>{
  try {
    const {id} = params;

    const data = await Post.findById(id)
    console.log(data);

    if(!data) throw new Error('No post is found with this id.')

    return data;

  } catch (error) {
    console.error(error);
  }
}

export const updateAction = async ()=>{
  try {
    
  } catch (error) {
    console.error(error);
    
  }
}

export const deleteAction = async ()=>{
  try {
    
  } catch (error) {
    console.error(error);
    
  }
}