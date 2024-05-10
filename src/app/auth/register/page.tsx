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

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   Form validation
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const { handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {};

  return (
    <>
      <div className="text-center">
        <h1 className="font-black text-2xl md:text-4xl mb-10">
          Let's get you started
        </h1>
      </div>

      <Button
        className="!bg-white !border-[#EAF8E9] !rounded-md !text-black flex items-center justify-center gap-3 hover:!shadow-sm hover:!bg-[#EAF8E9]"
        onClick={() => Auth.signInWithGoogle()}
      >
        Register with Google <Image src={google} alt="google" />
      </Button>

      <div className="items-center text-offgrey text-sm my-10 gap-2 hidden">
        <hr className="border-b border-[#E2E8F0] w-full" />
        <p>or</p>
        <hr className="border-b border-[#E2E8F0] w-full" />
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 hidden">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="mikedan@mail.com"
                    label="Name"
                    type="text"
                    id="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="Enter your email"
                    label="Email Address"
                    type="email"
                    id="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="********"
                    label="Password"
                    id="password"
                    isPassword
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 flex justify-center">
            {isLoading ? <Loading /> : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-offgrey text-sm mt-2 hidden">
        Already have an account?{" "}
        <Link href={LOGIN} className="font-bold text-secondary cursor-pointer">
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
