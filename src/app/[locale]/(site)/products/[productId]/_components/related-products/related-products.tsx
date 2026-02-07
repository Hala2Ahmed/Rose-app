import MainTitle from "@/components/shared/main-title";
import RelatedProductsCarousel from "./related-products-carousel";
import RelatedProductsContent from "./related-products-content";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { SingleCardSkeleton } from "@/components/skeletons/product-card.skeleton";

type RelatedProductsProps = {
    categoryId: string ,
}

export default function RelatedProducts({ categoryId }: RelatedProductsProps) {
    // Translation
    const t = useTranslations("related-products");

    return (
        <div className="mb-[433px]">
            {/* Title */}
            <MainTitle title={t("title")} />

            {/* Carousel */}
            <RelatedProductsCarousel>
                <Suspense
                    fallback={
                        <div className="flex gap-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <SingleCardSkeleton key={index} />
                            ))}
                        </div>
                    } >
                    <RelatedProductsContent categoryId={categoryId} />
                </Suspense>
            </RelatedProductsCarousel>
        </div>
    )
}
