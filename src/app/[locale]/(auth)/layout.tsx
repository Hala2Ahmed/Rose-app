import React from "react";

import { Providers } from "@/components/providers";

import Image from "next/image";

import { cn } from "@/lib/utils/tailwind-merge";

type LayoutProps = {
  children: React.ReactNode;
};

//variables
const SEPARATOR_IMAGE = "/assets/images/separator-2.png";

const HERO_IMAGE = "/assets/images/image4.png";

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

export default function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <div className="flex justify-between items-center min-h-screen">
        {/* Form Section */}
        <div className="w-full max-w-1.5xl mx-auto px-4">
          <Separator />

          {children}

          <Separator rotated />
        </div>

        {/* Hero Image Section */}
        <div className="w-full max-w-3.5xl relative min-h-screen">
          <Image
            src={HERO_IMAGE}
            alt="chocolate box"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Providers>
  );
}
