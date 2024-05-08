"use client";

import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default Providers;
