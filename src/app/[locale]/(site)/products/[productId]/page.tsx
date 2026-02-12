import RelatedProducts from "../../../../../components/features/related-products/related-products";
import ProductReviews from "./_components/reviews/product-reviews";

type PageProps = {
    params: {
        productId: string;
    }
}

export default function page({ params }: PageProps) {
    return (
        <div className="flex flex-col gap-12">
            {/* // TODO: pass a real data */}
            {/* Product's Reviews */}
            <ProductReviews productId={params.productId} rateAvg={3.5} rateCount={2} />

            {/* Related Products */}
            {/* //TODO: pass real categoryId */}
            <RelatedProducts categoryId={"673c46fd1159920171827c85"} />
        </div>
        )
}
