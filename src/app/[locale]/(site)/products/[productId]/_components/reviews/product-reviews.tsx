import { Suspense } from "react";
import AddReview from "./add-review";
import AllReviews from "./all-reviews";
import AllReviewsSkeleton from "@/components/skeletons/product-review/all-reviews.skeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import MainTitle from "@/components/shared/main-title";
import { renderStars } from "@/lib/utils/render-stars";
import { getTranslations } from "next-intl/server";

type ProductReviewsProps = {
    productId: string;
    rateCount: number,
    rateAvg: number,
};

export default async function ProductReviews({ productId, rateAvg, rateCount }: ProductReviewsProps) {
    //auth
    const session = await getServerSession(authOptions);

    //Translation
    const t = await getTranslations("review");

    return (
        <div className="my-13">
            {/* Title */}
            <MainTitle title={t("title")} />

            {/* General rating */}
            <div className="flex flex-col gap-1 leading-100 text-zinc-800 dark:text-zinc-50">
                {/*General rating title */}
                <span className="font-semibold text-xl">{t("general-rating")}:</span>
                {/** Rating number */}
                <div>
                    <span className="font-bold text-2xl">{rateAvg} </span>
                    <span className="font-medium text-sm text-zinc-500"> ({rateCount} {t("ratings")})</span>
                </div>
                {/** Rating stars */}
                <span className="flex gap-1">{renderStars(4)}</span>
            </div>

            <div className="flex gap-5 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                {/* All product reviews*/}
                <div className="
                    flex flex-col gap-2.5 pt-4 pe-5
                    h-367 w-742 overflow-y-auto
                    scrollbar-thin
                    scrollbar-thumb-zinc-400
                    scrollbar-track-transparent
                    [scrollbar-width:thin]
                    [scrollbar-color:#a1a1aa_transparent]
                ">
                    <AllReviews productId={productId} />
                </div>

                {/* Add review */}
                <div className="relative p-4 w-[484px]">
                    <div className={`${!session ? "blur-sm pointer-events-none select-none" : ""}`}>
                        <AddReview productId={productId} />
                    </div>

                    {!session && (
                        <div className="absolute rounded-md left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-[0.1px]">
                            <p className="text-center font-semibold text-base leading-100 text-zinc-800 dark:text-zinc-100">
                                Please login to be able to review the product
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

