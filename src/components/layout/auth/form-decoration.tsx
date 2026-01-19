"use client";
import React from "react";
import LanguageSwitcher from "../app/language-switcher";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SEPARATOR_IMAGE = "/assets/images/separator-2.png";

//decorative seprator image
const Separator = ({ rotated = false }: { rotated?: boolean }) => (
  <Image
    src={SEPARATOR_IMAGE}
    className={cn(
      "justify-self-center",
      rotated ? "rotate-180 mt-10" : "mb-10",
    )}
    alt="separator decoration"
    width={280}
    height={45}
    style={{ width: "auto", height: "auto" }}
  />
);

export default function FormDecoration() {
  const pathname = usePathname();

  const getMarginTop = () => {
    switch (pathname) {
      case "/login":
        return "mt-32";
      case "/register":
        return "mt-10";
      default:
        return "mt-0";
    }
  };

  return (
    <>
      {/* language switcher */}
      <LanguageSwitcher className={cn("mb-10 block ms-auto", getMarginTop())} />

      {/* image sperator */}
      <Separator />
    </>
  );
}
