"use client";

import {
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SimilarProduct } from "@/lib/types/similar-products";
import RelatedProductCard from "./related-product-card";

type TestimonialsCarouselProps = {
    items: SimilarProduct[];
};

export default function Content({
    items,
}: TestimonialsCarouselProps) {
    return (
        <div className="relative">
            <CarouselContent className="flex gap-4 p-2.5">
                {items.map((item, index) => (
                    <CarouselItem
                        key={index}
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
