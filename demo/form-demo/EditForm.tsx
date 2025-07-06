'use client' 

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, {  useActionState, useEffect, useRef } from "react";
import SubmitButton from "../button-demo/SubmitButton";
import { updateAction } from "@/app/actions/fileAction";
import { toast } from "sonner";
import { SquareCheck } from "lucide-react";
import Link from "next/link";
import ButtonDemo from "../button-demo/ButtonDemo";

export default function EditForm({
  id,
  caption,
  imageUrl
}: {
  id: string
  caption: string
  imageUrl: string
}) {
  const [state, formAction] = useActionState(updateAction, {
    success: false,
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-4">
       { state.success ?
       (
        <div className="flex flex-col items-center gap-4 justify-center">
            <SquareCheck size={25} className="text-green-500"/>
            <p className="text-pretty text-center lg:text-base text-sm font-medium">Thank you for updating. One of our team member will reach you soon!</p>
            <Link href={'/'}>
            <ButtonDemo name="Back to Home" type="button" className="bg-emerald-500 shadow-md rounded-md h-12"/>
            </Link>
        </div>
       ) :
       (<>
      <div className="space-y-2 text-center">
        <h1 className="font-semibold lg:text-4xl text-2xl">Edit Form</h1>
        <p className="lg:text-base text-sm">Edit caption here</p>
      </div>
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="space-y-4 dark:text-accent text-gray-500">
          <Image
            src={imageUrl}
            alt="post-image"
            height={400}
            width={400}
          />

          {/* Edit Caption input field */}
          <Input
            type="text"
            name="caption"
            defaultValue={caption}
            className="rounded-xl h-12 shadow-none"
          />
          <Label>This field is for caption.</Label>
          {state.errors?.caption && (<p className="text-red-500 text-sm">{state.errors?.caption}</p>)}

          {/* Hidden input for id */}
          <Input type="hidden" name="id" value={id} />
        </div>
        {state.message && !state.success && state.errors?.caption && (<p className="text-red-500 text-sm">{state.message}</p>)}


        <SubmitButton />
      </form>
      </>)}
    </Card>
  );
}
