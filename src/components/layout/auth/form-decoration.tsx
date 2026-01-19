import { cn } from "@/lib/utils/tailwind-merge";

import Image from "next/image";

import React from "react";

//variables
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
  return <Separator />;
}
export function FormDecorationInverted() {
  return <Separator rotated />;
}
