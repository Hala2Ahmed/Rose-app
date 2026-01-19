import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleCardSkeleton } from "./product-card.skeleton";

export default function BestSellingCarouselSkeleton() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl mx-auto">
      <CarouselContent className="-ml-6">
        {[...Array(6)].map((_, index) => (
          <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
            <SingleCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
