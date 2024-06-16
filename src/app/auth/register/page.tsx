"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { LOGIN } from "@/constants/path";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schema";
import InputField from "@/components/InputField";
import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import Auth from "@/utils/auth";

import google from "@/assets/icons/google.png";
import { title } from "process";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");

  const { toast } = useToast();

  return (
    <>
      <div className="text-center">
        <h1 className="font-black text-2xl md:text-4xl mb-10">
          Let's get you started
        </h1>
      </div>

      <div>
        <div className="w-full mb-5">
          <p className="font-bold">Company Name</p>
          <input
            type="text"
            value={companyName}
            className="w-full mt-2 p-2 border"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
        </div>
        {isLoading && <Loading />}
      </div>

      <Button
        className="!bg-white !border-[#EAF8E9] !rounded-md !text-black flex items-center justify-center gap-3 hover:!shadow-sm hover:!bg-[#EAF8E9]"
        onClick={() => {
          if (!companyName) {
            toast({
              title: "Error",
              description: "Company name is required",
              variant: "destructive",
            });
            return;
          }
          Auth.signUpWithGoogle(companyName);
        }}
      >
        Register with Google <Image src={google} alt="google" />
      </Button>

      <p className="text-center text-offgrey text-sm mt-2">
        Already have an account?{" "}
        <Link href={LOGIN} className="font-bold text-secondary cursor-pointer">
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
