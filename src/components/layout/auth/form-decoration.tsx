"use client";

import { cn } from "@/lib/utils/tailwind-merge";

import Image from "next/image";

import React from "react";

import useCaluclateMargins from "./hooks/use-calculate-margins";

import { useTheme } from "next-themes";

//variables
const SEPARATOR_IMAGE = "/assets/images/separator-2.png";
const SEPARATOR_IMAGE_Dark = "/assets/images/separator-1.png";

const Separator = ({ rotated = false }: { rotated?: boolean }) => {
  //hooks
  const { getMarginBottom } = useCaluclateMargins();
  const { theme } = useTheme();

  return (
    <Image
      src={theme == "dark" ? SEPARATOR_IMAGE_Dark : SEPARATOR_IMAGE}
      className={cn(
        "justify-self-center",
        rotated ? `rotate-180 mt-10 ${getMarginBottom()}` : "mb-10",
      )}
      alt="separator decoration"
      width={280}
      height={45}
      style={{ width: "auto", height: "auto" }}
    />
  );
};

export default function FormDecoration() {
  return <Separator />;
}

export function FormDecorationInverted() {
  return <Separator rotated />;
}
