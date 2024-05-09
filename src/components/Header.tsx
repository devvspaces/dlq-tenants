import { navLinks } from "@/constants/route";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full bg-white top-0 flex items-center justify-between py-4 px-10">
      <h1 className="font-bold text-2xl">Logo</h1>

      <nav className="flex gap-5" items-center>
        {navLinks.map(({ path, label }) => (
          <Link key={path} href={path}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
