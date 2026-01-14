"use client";

import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Testimonial } from "../../../../../lib/types/testimonials";
import TestimonialsCard from "./testimonials-card";
import AutoScroll from "embla-carousel-auto-scroll";

type TestimonialsCarouselProps = {
    items: Testimonial[];
};

export default function TestimonialsCarousel({
    items,
}: TestimonialsCarouselProps) {

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
                    {[...items, ...items].map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full sm:basis-1/2 lg:basis-1/3 pt-11 px-8 pb-16"
                        >
                            <TestimonialsCard
                                testimonial={item}
                                key={item._id}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Arrow Navigation */}
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
