"use client";

import { useRouter, useSearchParams } from "next/navigation";
import RatingStars from "./rating-stars";

export default function RatingFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRating = Number(searchParams.get("rating")) || null;

  const updateRating = (rating?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (rating) params.set("rating", rating.toString());
    else params.delete("rating");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
    {/* header to do */}

    {/* rating stars */}
      <RatingStars
        selectedRating={selectedRating}
        onSelect={updateRating}
      />
    </>
  );
}