"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function Navbar() {

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-3">
        </div>
      </div>
    </header>
  );
}
