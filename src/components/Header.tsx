"use client";

import { navLinks } from "@/constants/route";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Auth from "@/utils/auth";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  return (
    <header className="fixed w-full bg-white top-0 flex items-center justify-between py-4 px-10">
      <h1 className="font-bold text-2xl">Hi, {user.displayName}</h1>

      <nav className="flex gap-5 items-center">
        {navLinks.map(({ path, label }) => (
          <Link key={path} href={path}>
            {label}
          </Link>
        ))}
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => Auth.logOut()}
        >
          <LogOutIcon />
        </button>
      </nav>
    </header>
  );
};

export default Header;
