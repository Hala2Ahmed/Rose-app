"use client";

import MainTitle from "@/components/shared/main-title";

import { Occasion } from "@/lib/types/occasions.types";

import { cn } from "@/lib/utils/tailwind-merge";

import { useTranslations } from "next-intl";

import { useRouter, useSearchParams } from "next/navigation";

import React from "react";

interface MostPopularHeaderProps {
  occasions: Occasion[];
}

export default function MostPopularHeader({
  occasions,
}: MostPopularHeaderProps) {
  //Navigation
  const router = useRouter();

  const searchParams = useSearchParams();

  //translations
  const t = useTranslations("most-popular");

  const activeOccasion = searchParams.get("occasion");

  //get products upon occasion click function
  const handleOccasionClick = (occasionId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeOccasion === occasionId) {
      params.delete("occasion");
    } else {
      params.set("occasion", occasionId);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between mb-10">
      <MainTitle title={t("title")} />
      <ul className="flex gap-6">
        {occasions.map((occasion) => (
          <li key={occasion._id}>
            <button
              onClick={() => handleOccasionClick(occasion._id)}
              //toggle active occasion class
              className={cn(
                "transition-colors",
                activeOccasion === occasion._id
                  ? "text-maroon-600 font-semibold"
                  : "text-zinc-700 hover:text-maroon-500",
              )}>
              {occasion.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
