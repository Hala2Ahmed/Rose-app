"use client";

import React from "react";

import LanguageSwitcher from "@/components/layout/app/language-switcher";

import { cn } from "@/lib/utils/tailwind-merge";

import useCaluclateMargins from "@/components/layout/auth/hooks/use-calculate-margins";

export default function AuthLanguageSwitcher() {
  //hooks
  const { getMarginTop } = useCaluclateMargins();
  return (
    <LanguageSwitcher className={cn("mb-10 ms-auto block", getMarginTop())} />
  );
}
