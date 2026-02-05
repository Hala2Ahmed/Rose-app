import React from "react";
import CategoryFilter from "./_components/filters/category-filter/category-filter";
import RatingFilter from "./_components/filters/rating-filter/rating-filter";
import ResetAllButton from "./_components/filters/reset-all-btn";

export default function Products() {
  return (
    <>
      <div className="w-[17rem]">
        <CategoryFilter />
        <RatingFilter />
        <ResetAllButton />
      </div>
    </>
  );
}
