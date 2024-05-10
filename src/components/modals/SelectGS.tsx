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
import { sheets } from "@/constants/data";

import tick from "@/assets/icons/tick.svg";

const SelectGSModal = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <DialogContent className="p-10">
      <DialogHeader>
        <DialogTitle className="mb-5 text-center">
          Select Google Sheet
        </DialogTitle>
        <DialogDescription>
          <div className="grid gird-cols-1 md:grid-cols-2 gap-5 md:w-2/3 mx-auto text-center text-[#232555]"></div>
          {sheets.map((sheet, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer text-xs my-3 py-5 px-3 flex items-center justify-between border border-[#EBEBEB] rounded-md"
            >
              <p>{sheet.label}</p>
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

export default SelectGSModal;
