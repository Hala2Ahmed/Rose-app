"use client";

import { useState } from "react";
import StarIcon from "./star-icon";

type Props = {
  selectedRating: number | null;
  onSelect: (rating: number) => void;
};

export default function RatingStars({
  selectedRating,
  onSelect,
}: Props) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const activeRating = hoverRating ?? selectedRating ?? 0;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div
          key={rating}
          onMouseEnter={() => setHoverRating(rating)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => onSelect(rating)}
          className="cursor-pointer"
        >
          <StarIcon filled={rating <= activeRating} />
        </div>
      ))}
    </div>
  );
}