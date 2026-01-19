"use client";

import * as React from "react";
import {
    Carousel,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useLocale } from "next-intl";

type TestimonialsCarouselProps = {
    children: React.ReactNode,
}

export default function TestimonialsCarousel({ children }: TestimonialsCarouselProps) {
    // Translation
    const locale = useLocale();

    {/* Embla Carousel */ }
    const autoScroll = React.useRef(
        AutoScroll({
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    return (
        <div className="w-full bg-maroon-50 flex flex-col justify-center items-center px-10 py-16 dark:bg-zinc-700">
            <Carousel
                opts={{
                    loop: true,
                    align: "start",
                    direction:locale === "ar"? "rtl" : "ltr",
                }}
                plugins={[autoScroll.current]}
                className="w-5/6"
            >
                {/* Carousel Content */}
                {children}
            </Carousel>
        </div>
    )
}
