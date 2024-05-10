"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "../Button";
import Image from "next/image";
import { prompts } from "@/constants/data";

import tick from "@/assets/icons/tick.svg";

const ChangeAIPromptModal = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <DialogContent className="p-10">
      <DialogHeader>
        <DialogTitle className="mb-5 text-center">Change AI Prompt</DialogTitle>
        <DialogDescription>
          <div className="md:w-2/3 mx-auto text-center text-[#232555]"></div>
          {prompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer text-xs my-3 py-5 px-3 flex items-center justify-between border border-[#EBEBEB] rounded-md"
            >
              <p>{prompt.label}</p>
              <Image
                className={selectedIndex === index ? "block" : "hidden"}
                src={tick}
                alt="tick"
              />
            </div>
          ))}
          <div className="mt-10 md:w-2/3 mx-auto">
            <Button className="mt-10 block w-full py-1">Continue</Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default ChangeAIPromptModal;
