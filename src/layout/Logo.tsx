import logo from "@/assets/logo.png"
import logoDark from "@/assets/logo.png"
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

export default function Logo({
  mode = "light",
  className,
}: {
  mode?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("flex cursor-pointer items-center gap-2", className)}
    >
      <Image
        src={mode === "dark" ? logoDark : logo}
        alt="logo"
        height={300}
        width={500}
        className="max-h-16 w-min object-contain"
      />
      {/* <p className="cursor-pointer text-lg text-white font-medium md:text-3xl">
        SimpliCV
      </p> */}
    </Link>
  );
}
