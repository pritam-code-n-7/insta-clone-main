import { getActionById } from "@/app/actions/fileAction";
import EditForm from "@/demo/form-demo/EditForm";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params;
  const postDetails = await getActionById(id);

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
