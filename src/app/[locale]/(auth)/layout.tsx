import React from "react";
import { Providers } from "@/components/providers";

type LayoutProps = { children: React.ReactNode };

export default function layout({ children }: LayoutProps) {
  return <Providers>{children}</Providers>;
}
