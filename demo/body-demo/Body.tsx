"use server";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FileUploadField from "../file-upload-demo/FileUploadField";
import SubmitButton from "../button-demo/SubmitButton";

import React from "react";
import { getAction, submitAction } from "@/app/actions/fileAction";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuoteIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import ButtonDemo from "../button-demo/ButtonDemo";
import Link from "next/link";

const Body = async () => {
  const posts = await getAction();
  // console.log(JSON.stringify(posts));

  return (
    <div className="py-20 lg:px-50 px-10 space-y-10">
      <form action={submitAction} className="space-y-6">
        {/* File upload field */}
        <div className="space-y-4 dark:text-accent text-gray-500">
          <FileUploadField name="dropzoneFile" />
          <Label>This field is for file upload.</Label>
        </div>

        {/* Caption input field */}
        <div className="space-y-4 dark:text-accent text-gray-500">
          <Input
            type="text"
            name="caption"
            placeholder="Fair and Lovely"
            className="rounded-xl h-12 shadow-none"
          />
          <Label>This field is for caption.</Label>
        </div>

        <SubmitButton />
      </form>

      <div className="space-y-4">
        <Label className="font-semibold text-xl font-sans">
          Your Photo Galary
        </Label>

        <ScrollArea className="border p-5 rounded-xl h-[500px] bg-muted/50">
          <div className="grid lg:grid-cols-4 grid-cols-2 space-y-1">
          {posts.map((post) => (
            <Card className="bg-blue-50 border-0 shadow-md py-0 lg:w-[360px] md:w-[170px] sm:w-[150px] xs:w-[140px] " key={post._id}>
                {post.image?.secure_url && (
                  <Image
                    src={post.image.secure_url}
                    alt={post.caption}
                    width={200}
                    height={200}
                    className="w-full rounded-t-xl"
                  />
                )}
              <CardContent className="dark:text-black mb-2">
                <QuoteIcon className="rotate-180 right-0"/>
                <p className="font-semibold text-pretty lg:text-base text-xs ml-4">{post.caption}</p>
              </CardContent>
              <CardFooter className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-2 p-5">
                <Link href={`/edit/${post._id}`}>
                <ButtonDemo name="Edit" type="button" className="py-3 px-6 rounded-md shadow-md bg-black"/>
                </Link>
                <ButtonDemo name="Delete" type="button" className="py-3 px-6 rounded-md shadow-md bg-red-500"/>
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
