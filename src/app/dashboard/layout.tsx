import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="mt-20 px-20">{children}</div>
    </div>
  );
};

export default Layout;
