"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import RatingStars from "./rating-stars";
import FilterTitle from "../../filter-title";

export default function RatingFilter() {
  const t = useTranslations("products.filters");
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRating = Number(searchParams.get("rating")) || null;

  const updateRating = (rating?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (rating) params.set("rating", rating.toString());
    else params.delete("rating");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const isFilterSelected = selectedRating !== null;

  return (
    <div className="mb-5">
      {/*  Filter header */}
      <FilterTitle
        title={t("rating-title")}
        isFilterSelected={isFilterSelected}
        paramsToReset={["rating"]}
      />

      {/*  Rating stars */}
      <RatingStars
        selectedRating={selectedRating}
        onSelect={updateRating}
      />
    </div>
  );
}