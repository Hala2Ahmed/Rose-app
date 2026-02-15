import React, { Suspense } from "react";
import BestSellingCarouselSkeleton from "../skeletons/best-selling-carousel.skeleton";
import ProductMayLikeContent from "./product-may-like-content";
import ProductMayLikeHeader from "./product-may-like-header";
import { fetchRecommendations } from "@/lib/actions/recommendations.action";

export default async function ProductMayLike() {
  const data = await fetchRecommendations();

  if (!data?.recommendations?.length) {
    return null;
  }

  return (
    <div className="mt-14 mb-7">
      <ProductMayLikeHeader />
      <Suspense fallback={<BestSellingCarouselSkeleton />}>
        <ProductMayLikeContent data={data.recommendations} />
      </Suspense>
    </div>
  );
}
