"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

type TestimonialsCarouselProps = {
    children: React.ReactNode,
}

export default function TestimonialsCarousel({ children }: TestimonialsCarouselProps) {
    {/* Embla Carousel */ }
    const autoScroll = React.useRef(
        AutoScroll({
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    return (
        <div className="w-full bg-maroon-50 flex flex-col justify-center items-center px-28 py-16 dark:bg-zinc-700">
            <Carousel
                opts={{
                    loop: true,
                    align: "start",
                }}
                plugins={[autoScroll.current]}
                className="w-full max-w-303"
            >
                {/* Carousel Content */}
                <CarouselContent>
                    {children}
                </CarouselContent>

            </Carousel>
        </div>
    )
}
