import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BestSellingCard from "./best-selling-card";
import { getBestSelling } from "@/lib/api/get-best-selling";

export async function BestSellingCarousel() {
  const result = await getBestSelling();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl mx-auto">
      <CarouselContent className="-ml-6">
        {result?.data?.map((product) => (
          <CarouselItem
            key={product._id}
            className="pl-6 md:basis-1/2 lg:basis-1/3">
            <BestSellingCard data={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
