"use client";

import { navLinks } from "@/constants/route";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Auth from "@/utils/auth";
import { User } from "@/utils/types";

const Header = () => {
  const [user, setUser] = useState<User>({
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(window.localStorage.getItem("user") || ""));
    }
  }, []);

  return (
    <header className="fixed z-40 w-full bg-white top-0 flex items-center justify-between py-4 px-10">
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
