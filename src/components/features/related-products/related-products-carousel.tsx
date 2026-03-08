"use client";

import {
    Carousel,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";

type TestimonialsCarouselProps = {
    children: React.ReactNode,
}

export default function RelatedProductsCarousel({ children }: TestimonialsCarouselProps) {
    // Translation
    const locale = useLocale();

    return (
        <div className="w-full flex flex-col justify-center items-center mt-4">
            <Carousel
                opts={{
                    direction:locale === "ar"? "rtl" : "ltr",
                }}
                className="w-full"
            >
                {/* Carousel Content */}
                {children}
            </Carousel>
        </div>
    )
}