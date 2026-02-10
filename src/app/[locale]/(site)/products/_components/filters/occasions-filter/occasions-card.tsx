"use client";

import { useUrlParams } from "@/hooks/use-url-params";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import React from "react";

type OccasionCardProps = {
  imageSrc: string;
  title: string;
  occasionId: string;
  isActive: boolean;
};

export default function OccasionsCard({
  imageSrc,
  title,
  occasionId,
  isActive,
}: OccasionCardProps) {
  //hooks
  const { appendParam } = useUrlParams();

  return (
    <div
      onClick={() => appendParam("occasion", occasionId)}
      className="w-full h-20 relative rounded-lg overflow-hidden  cursor-pointer group mt-2">
      {/* Occasion Image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${imageSrc}`}
        fill
        alt={title}
        className="object-cover"
        sizes="(max-width: 768px) 128px, 128px"
      />
      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300 ",
          isActive
            ? "bg-gradient-to-b from-[#00000040] to-[#A6252A]"
            : "bg-gradient-to-b from-[#00000080] to-[#000000] group-hover:opacity-0",
        )}
      />
      {/* Occasion Title */}
      <p className="absolute inset-0 flex items-center justify-center text-white font-medium z-10">
        {title}
      </p>
    </div>
  );
}
