"use client";

import MainTitle from "@/components/shared/main-title";
import { useUrlParams } from "@/hooks/use-url-params";

import { Occasion } from "@/lib/types/occasions.types";

import { cn } from "@/lib/utils/tailwind-merge";

import { useTranslations } from "next-intl";

import { useSearchParams } from "next/navigation";

import React from "react";

interface MostPopularHeaderProps {
  occasions: Occasion[];
}

export default function MostPopularHeader({
  occasions,
}: MostPopularHeaderProps) {
  //hooks
  const searchParams = useSearchParams();
  const { toggleParam } = useUrlParams();

  //translations
  const t = useTranslations("most-popular");

  const activeOccasion = searchParams.get("occasion");

  return (
    <div className="flex items-center justify-between mb-10">
      <MainTitle title={t("title")} />
      <ul className="flex gap-6">
        {occasions?.map((occasion: Occasion) => (
          <li key={occasion._id}>
            <button
              onClick={() => toggleParam("occasion", occasion._id)}
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
