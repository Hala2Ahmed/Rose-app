import React, { Suspense } from "react";
import MostPopularHeader from "./most-pop-header";
import MostPopularList from "./most-pop-list";
import { getAllOccasions } from "@/lib/api/get-all-occasions";
import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton";

interface MostPopularIndexProps {
  searchParams?: { occasion?: string };
}

export default async function MostPopularIndex({
  searchParams,
}: MostPopularIndexProps) {
  const allOccasions = await getAllOccasions({ limit: 4 });

  return (
    <div className="my-36">
      <MostPopularHeader occasions={allOccasions.data} />
      <Suspense fallback={<ProductCardSkeleton count={12} />}>
        <MostPopularList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
