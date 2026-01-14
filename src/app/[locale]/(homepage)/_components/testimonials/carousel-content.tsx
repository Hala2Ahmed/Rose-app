"use client";

import * as React from "react";
import { Testimonial } from "../../../../../lib/types/testimonials";
import TestimonialsCard from "./testimonials-card";
import {
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

type TestimonialsCarouselProps = {
    items: Testimonial[];
};

function Content({
    items,
}: TestimonialsCarouselProps) {
    return (
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
    );
}

export default Content;
