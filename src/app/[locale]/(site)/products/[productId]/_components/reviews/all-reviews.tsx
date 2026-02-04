"use client";

import { useProductReviews } from "../../_hooks/reviews/use-get-reviews";
import Review from "./review";
import ReviewSkeleton from "@/components/skeletons/product-review/review.skeleton";

type AllReviewsProps = { productId: string };

export default function AllReviews({ productId }: AllReviewsProps) {
    // Mutation
    const { payload, isLoading } = useProductReviews(productId);

    // Loading
    if (isLoading) return (
        <>
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <ReviewSkeleton key={index} />
                ))
            }
        </>
    );

    // Empty reviews
    if (!payload || payload.reviews.length === 0) {
        return (
            <p className="flex flex-col justify-center items-center w-full h-full">
                No Reviews Available
            </p>
        );
    }

    return <>{payload.reviews.map((r) => <Review key={r._id} review={r} />)}</>;
}
