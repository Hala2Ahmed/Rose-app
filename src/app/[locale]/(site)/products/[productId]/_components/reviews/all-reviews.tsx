import { getTranslations } from "next-intl/server";
import Review from "./review";
import { getProductsReviewService } from "../../_services/reviews/get-product-reviews.service";

type AllReviewsProps = {
    productId: string;
};

export default async function AllReviews({ productId }: AllReviewsProps) {
    //Translation
    const t = await getTranslations("review");

    // Services 
    const data = await getProductsReviewService(productId);

    if (data.reviews.length == 0) {
        return <p className="flex flex-col justify-center items-center w-full h-full">{t("reviews-empty")}</p>
    }

    return (
        <>
            {data.reviews.map(r => <Review key={r._id} review={r} />)}
        </>
    )
}
