"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import React from "react";
import { useFormStatus } from "react-dom";


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="h-12 bg-blue-500 hover:bg-blue-400 rounded-lg shadow-md w-full">
      {pending ? (
        <>
            <Loader2 className="animate-spin"/>
            Uploading...
        </>
      ) : "Upload"}
    </Button>
  );
};

export default SubmitButton;
