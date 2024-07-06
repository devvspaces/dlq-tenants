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
import { GetVoicesQuery } from "@/services/settings";
import Loading from "../Loading";

import tick from "@/assets/icons/tick.svg";

const SelectVoiceModal = ({
  handleChangeVoice,
}: {
  handleChangeVoice: (voice: any) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState();

  const { data: voices, isLoading } = GetVoicesQuery();

  const setVoice = (index: number, voice: any) => {
    setSelectedIndex(index);
    setSelectedVoice(voice);
  };

  const customLoader = ({ src, width, quality }: {
    src: string;
    width: number | string;
    quality?: number;
  }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <DialogContent className="p-10">
      <DialogHeader className="max-h-80">
        <DialogTitle className="mb-5 text-center">Select AI Voice</DialogTitle>
        <DialogDescription className="overflow-y-scroll ">
          <div className="md:w-2/3 mx-auto text-center text-[#232555]"></div>
          {isLoading ? (
            <Loading color="#000" />
          ) : (
            voices.data.map((voice: any, index: number) => (
              <div
                key={index}
                onClick={() => setVoice(index, voice?.voice_id)}
                className="cursor-pointer text-xs my-3 py-5 px-3 flex items-center border border-[#EBEBEB] rounded-md"
              >
                <Image
                  loader={customLoader}
                  width={50}
                  height={50}
                  src={voice?.avatar_url}
                  alt="tick"
                  className="mr-3"
                />
                <div className="">
                  <p className="font-semibold mb-2">{voice?.voice_name}</p>
                  <div className="flex items-center gap-3">
                    <p>{voice?.gender}</p>
                    <p>{voice?.accent}</p>
                  </div>
                </div>
                <Image
                  className={selectedIndex === index ? "block ml-auto" : "hidden"}
                  src={tick}
                  alt="tick"
                />
              </div>
            ))
          )}
        </DialogDescription>
      </DialogHeader>
      <div className="md:w-2/3 mx-auto">
        <Button
          onClick={() => handleChangeVoice(selectedVoice)}
          className="block w-full py-1"
        >
          Continue
        </Button>
      </div>
    </DialogContent>
  );
};

export default SelectVoiceModal;
