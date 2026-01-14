'use client';

import {
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import TestimonialsCardSkeleton from './testimonials-card.skeleton';


function TestimonialsContentSkeleton() {
    return (
        <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                    key={index}
                    className="basis-full sm:basis-1/2 lg:basis-1/3 pt-11 px-8 pb-16"
                >
                    <TestimonialsCardSkeleton />
                </CarouselItem>
            ))}
        </CarouselContent>
    );
}

export default TestimonialsContentSkeleton;
