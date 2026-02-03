import ProductReviews from "./_components/product-reviews";

type PageProps = {
    params: {
        productId: string;
    }
}

export default function page({ params }: PageProps) {
    return (
        <>
            {/* // TODO: pass a real data */}
            <ProductReviews productId={params.productId} rateAvg={3.5} rateCount={2} />
        </>)
}
