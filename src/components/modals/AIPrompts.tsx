"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "../Button";

const ChangeAIPromptModal = ({
  ai_prompt,
  handleUpdatePrompt,
}: {
  ai_prompt: string;
  handleUpdatePrompt: (val: string) => void;
}) => {
  const [prompt, setPrompt] = useState(ai_prompt);

  return (
    <DialogContent className="p-10">
      <DialogHeader className="max-h-80">
        <DialogTitle className="mb-5 text-center">Change AI Prompt</DialogTitle>
        <DialogDescription>
          <div className="md:w-2/3 mx-auto text-center text-[#232555]"></div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-5 outline-none border border-[#EBEBEB] rounded-md"
            rows={5}
          ></textarea>
          <p className="text-sm mt-2 italic text-center">
            If you want the AI to speak first, clear the input box above.
          </p>
        </DialogDescription>
      </DialogHeader>
      <div className="md:w-2/3 mx-auto">
        <Button
          onClick={() => handleUpdatePrompt(prompt)}
          className="block w-full py-1"
        >
          Continue
        </Button>
      </div>
    </DialogContent>
  );
};

export default ChangeAIPromptModal;
