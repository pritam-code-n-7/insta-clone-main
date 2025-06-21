"use client";

import { Button } from "@/components/ui/button";

import React from "react";
import { useFormStatus } from "react-dom";


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className=" h-12 bg-blue-500 rounded-lg shadow-md w-full ">
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default SubmitButton;
