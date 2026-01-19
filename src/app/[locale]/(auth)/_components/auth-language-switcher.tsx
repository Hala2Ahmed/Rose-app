"use client";

import React from "react";

import { usePathname } from "@/i18n/navigation";

import LanguageSwitcher from "@/components/layout/app/language-switcher";

import { cn } from "@/lib/utils/tailwind-merge";

export default function AuthLanguageSwitcher() {
  const pathname = usePathname();

  const getMarginTop = () => {
    switch (true) {
      case pathname.includes("/register"):
        return "mt-28";
      default:
        return "mt-20";
    }
  };

  return (
    <LanguageSwitcher className={cn("mb-10 ms-auto block", getMarginTop())} />
  );
}
