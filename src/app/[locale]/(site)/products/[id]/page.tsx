import ProductDetailsSkeleton from "@/components/skeletons/product-details/product-details.skeleton";
import React, { Suspense } from "react";
import ProductContent from "./_components/product-content";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductContent id={params.id} />
    </Suspense>
  );
}
