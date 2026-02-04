import { getTranslations } from "next-intl/server";
import { getProductsReviewService } from "../../_services/reviews/get-reviews.services";
import Review from "./review";

type AllReviewsProps = {
    productId: string
};

export default async function AllReviews({ productId }: AllReviewsProps) {
    //Translation
    const t = await getTranslations("review");

    // Services 
    const payload = await getProductsReviewService(productId);

    // Empty reviews
    if (!payload || payload.reviews.length == 0) {
        return (
            <p className="flex flex-col justify-center items-center w-full h-full">
                {t('reviews-empty')}
            </p>
        );
    }

    return (
        <>
            {payload.reviews.map((r) => <Review key={r._id} review={r} />)}
        </>
    );
}
