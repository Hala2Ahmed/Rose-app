"use client";

import {
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import RelatedProductCard from "./related-product-card";
import { Product } from "@/lib/types/products";

type TestimonialsCarouselProps = {
    items: Product[];
};

export default function ContentCarousel({
    items,
}: TestimonialsCarouselProps) {
    return (
        <div className="relative">
            <CarouselContent className="flex gap-4 p-2.5">
                {items.map((item) => (
                    <CarouselItem
                        key={item._id}
                        className="basis-full sm:basis-1/2 lg:basis-1/4"
                    >
                        {/* //TODO: use shared component */}
                        <RelatedProductCard
                            data={item}
                            key={item._id}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious
                className="absolute top-1/2 -translate-y-1/2 start-0 
                bg-maroon-600 hover:bg-maroon-700 text-zinc-50 hover:border-maroon-700
                dark:bg-softPink-200 dark:hover:bg-softPink-300 dark:text-zinc-800"
            />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 end-0 
                bg-maroon-600 hover:bg-maroon-700 text-zinc-50 hover:border-maroon-700
            dark:bg-softPink-200 dark:hover:bg-softPink-300 dark:text-zinc-800"
            />
        </div>
    );
}
