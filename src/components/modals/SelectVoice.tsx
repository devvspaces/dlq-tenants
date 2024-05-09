import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "../Button";

const SelectVoiceModal = () => {
  return (
    <DialogContent className="p-10">
      <DialogHeader>
        <DialogTitle className="mb-5 text-center">Select AI Voice</DialogTitle>
        <DialogDescription>
          <div className="md:w-2/3 mx-auto text-center text-[#232555]"></div>

          <div className="mt-10 md:w-2/3 mx-auto">
            <Button className="mt-10 block w-full py-1">Continue</Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default SelectVoiceModal;
