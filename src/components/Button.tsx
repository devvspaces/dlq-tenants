import React from "react";
import { ButtonProps } from "@/utils/types";

const Button = ({
  children,
  className,
  onClick,
  isSecondary = false,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`text-white w-full font-bold border-2 border-[#232555] text-sm rounded-full px-8 py-2 md:py-3 bg-[#232555] transition-all ease-linear duration-300 cursor-pointer md:hover:scale-105 ${
        isSecondary ? "!text-[#232555] bg-white border-white" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Button;
