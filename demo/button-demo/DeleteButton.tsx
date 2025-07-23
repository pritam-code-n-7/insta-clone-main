"use client";

import { Button } from "@/components/ui/button";
import { TActionResponse } from "@/types/Type";
import React, { useTransition } from "react";
import { toast } from "sonner";

const DeleteButton = ({
  id,
  action,
}: {
  id: string;
  action: (formData: FormData) => Promise<TActionResponse>;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const formData = new FormData();
    formData.append("id", id);
    startTransition(async() => {
        try {
        const res = await action(formData)
        if(res.success){
            toast.success(res.message)
        }
        else{
            toast.error(res.message)
        }
            
        } catch (error) {
            console.error(error);
            toast.error('An unknown error has occurred.')
        }
    });
  };

  return (
    <Button
      type="submit"
      className="h-12 w-24 bg-red-500 hover:bg-red-400 rounded-lg shadow-md"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
