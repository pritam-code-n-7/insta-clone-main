import { getActionById } from "@/app/actions/fileAction";
import EditForm from "@/demo/form-demo/EditForm";

// Update the params type to be a Promise
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const postDetails = await getActionById(id);

  if (!postDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <EditForm
        caption={postDetails.caption}
        imageUrl={postDetails.image.secure_url}
        id={id}
      />
    </div>
  );
}