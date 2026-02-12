import React from "react";
import ProductDetails from "./_components/product-details";
import ProductReviews from "./_components/reviews/product-reviews";
import RelatedProducts from "@/components/features/related-products/related-products";

export default function Page({ params }: { params: { id: string } }) {
  return (
            <div className="flex flex-col gap-12">
              {/* Product details */}
              <ProductDetails id={params.id} />

                {/* // TODO: pass a real data */}
                {/* Product's reviews */}
                <ProductReviews productId={params.id} rateAvg={3.5} rateCount={2} />
    
                {/* Related products */}
                {/* //TODO: pass real categoryId */}
                <RelatedProducts categoryId={"673c46fd1159920171827c85"} />
            </div>
  )
}
