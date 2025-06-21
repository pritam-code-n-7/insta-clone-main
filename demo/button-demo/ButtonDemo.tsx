import { Button } from "@/components/ui/button";
import { TButton } from "@/types/Type";
import React from "react";

const ButtonDemo = ({ name, type, onClick, className }: TButton) => {
  return (
    <Button type={type} onClick={onClick} className={className}>
      {name}
    </Button>
  );
};

export default ButtonDemo;
