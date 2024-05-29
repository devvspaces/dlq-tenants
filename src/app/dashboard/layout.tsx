"use client";

import Header from "@/components/Header";
import { LOGIN } from "@/constants/path";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        toast({
          title: "Please Log In",
          description: "No session",
          variant: "destructive",
        });
        window.location.href = LOGIN;
      }
    }
  }, [toast]);

  return (
    <>
      <Header />
      {/* <Sidebar /> */}
      <div className="mt-20 px-20">{children}</div>
    </>
  );
};

export default Layout;
