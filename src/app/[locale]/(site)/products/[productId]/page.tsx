import RelatedProducts from "./_components/related-products/related-products";
import ProductReviews from "./_components/reviews/product-reviews";

type PageProps = {
    params: {
        productId: string;
    }
}

export default function page({ params }: PageProps) {
    return (
        <>
            {/* // TODO: pass a real data */}
            {/* Product's Reviews */}
            <ProductReviews productId={params.productId} rateAvg={3.5} rateCount={2} />

            {/* Related Products */}
            <RelatedProducts productId={params.productId} />
        </>)
}
