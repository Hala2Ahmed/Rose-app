import React, { Suspense } from "react";
import BestSellingCarouselSkeleton from "../skeletons/best-selling-carousel.skeleton";
import ProductMayLikeContent from "./product-may-like-content";
import ProductMayLikeHeader from "./product-may-like-header";

export default function ProductMayLike() {
  return (
    <div className="mt-14 mb-7">
      <ProductMayLikeHeader />
      <Suspense fallback={<BestSellingCarouselSkeleton />}>
        <ProductMayLikeContent />
      </Suspense>
    </div>
  );
}