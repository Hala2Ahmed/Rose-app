import ReviewSkeleton from "./review.skeleton";

export default function AllReviewsSkeleton() {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <ReviewSkeleton key={index} />
            ))}
        </>
    )
}
