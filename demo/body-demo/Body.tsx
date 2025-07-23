
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FileUploadField from "../file-upload-demo/FileUploadField";
import SubmitButton from "../button-demo/SubmitButton";

import React from "react";
import { deleteAction, getAction, submitAction } from "@/app/actions/fileAction";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuoteIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import ButtonDemo from "../button-demo/ButtonDemo";
import Link from "next/link";
import DeleteButton from "../button-demo/DeleteButton";

const Body = async () => {
  const posts = await getAction();
  // console.log(JSON.stringify(posts));

  return (
    <div className="py-20 lg:px-50 px-10 space-y-10">
      <form action={submitAction} className="space-y-6">
        {/* File upload field */}
        <div className="space-y-4 dark:text-accent text-gray-500">
          <FileUploadField name="dropzoneFile" />
          <Label>This field is for file upload. This will be displayed to user.</Label>
        </div>

        {/* Caption input field */}
        <div className="space-y-4 dark:text-accent text-gray-500">
          <Input
            required
            type="text"
            name="caption"
            placeholder="Fair and Lovely"
            className="rounded-xl h-12 shadow-none"
          />
          <Label>This field is for caption. This will be displayed to user.</Label>
        </div>

        <SubmitButton />
      </form>

      <div className="space-y-4">
        <Label className="font-semibold text-xl font-sans">
          Your Photo Galary
        </Label>

        <ScrollArea className="border p-5 rounded-xl h-[500px] bg-muted/50">
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-2">
          {posts.map((post) => (
            <Card key={post._id} className="bg-zinc-200 dark:bg-zinc-600 border-0 shadow-md py-0 w-[300px] lg:h-[450px] h-[400px]">
                {post.image?.secure_url && (
                  <Image
                    src={post.image.secure_url}
                    alt={post.caption}
                    width={200}
                    height={200}
                    className="w-[300px] h-[200px] rounded-t-xl "
                  />
                )}
              <CardContent className="dark:text-black mb-2 h-24">
                <QuoteIcon className="rotate-180 right-0"/>
                <p className="font-semibold text-pretty lg:text-base text-xs ml-4 dark:text-white">{post.caption}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between h-24">
                <Link href={`/edit/${post._id}`}>
                <ButtonDemo name="Edit" type="button" className="h-12 w-24 rounded-md shadow-md"/>
                </Link>
                <DeleteButton id={post._id.toString()} action={deleteAction}/>
              </CardFooter>
            </Card>
          ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Body;
