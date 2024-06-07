"use client";

import Image from "next/image";
import React, { useState } from "react";
import { InputPropType } from "@/utils/types";

import eyeClosed from "@/assets/icons/eye-closed.svg";
import eyeOpen from "@/assets/icons/eye-open.svg";

const InputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type,
  isPassword,
  isDisabled,
}: InputPropType) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      {isPassword ? (
        <div className="mt-3">
          <label className="text-sm mb-1 font-bold block">{label}</label>
          <div className="relative flex bg-white rounded-md my-2 border border-[#676E7629] shadow-sm focus:border-primary w-full text-primary font-bold  placeholder:text-offgrey">
            <input
              id={id}
              value={value}
              onChange={onChange}
              type={isShown ? "text" : "password"}
              placeholder={placeholder}
              className="w-full outline-none py-3 px-4 rounded-md"
            />
            <button
              type="button"
              className="absolute right-2 top-0 bottom-0 text-sm text-primary p-2"
              onClick={() => setIsShown(!isShown)}
            >
              {isShown ? (
                <Image src={eyeClosed} alt="eye closed" />
              ) : (
                <Image src={eyeOpen} alt="eye open" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <label className="text-sm mb-1 font-bold block">{label}</label>
          <input
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            className="bg-white rounded-md my-2 border border-[#676E7629] shadow-sm focus:border-primary w-full text-primary font-bold outline-none py-3 px-4 placeholder:text-offgrey"
          />
        </div>
      )}
    </>
  );
};

export default InputField;
