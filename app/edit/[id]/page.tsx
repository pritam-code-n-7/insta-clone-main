import { getActionById } from "@/app/actions/fileAction";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/demo/button-demo/SubmitButton";
import Image from "next/image";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const postDetails = await getActionById({ params });

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="space-y-2 text-center">
          <h1 className="font-semibold lg:text-4xl text-2xl">
            Edit Form
          </h1>
          <p className="lg:text-base text-sm">Edit caption here</p>
        </div>
        <form action={"#"} className="space-y-6">
          <div className="space-y-4 dark:text-accent text-gray-500">
            <Image
              src={postDetails.image.secure_url}
              alt="post-image"
              height={400}
              width={400}
            />

            {/* Edit Caption input field */}
            <Input
              type="text"
              name="caption"
              defaultValue={postDetails?.caption ?? ""}
              className="rounded-xl h-12 shadow-none"
            />
            <Label>This field is for caption.</Label>
          </div>

          <SubmitButton />
        </form>
      </Card>
    </div>
  );
}
