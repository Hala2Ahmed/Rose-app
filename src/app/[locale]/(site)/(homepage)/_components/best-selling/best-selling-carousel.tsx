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

import EmptyState from "@/components/shared/empty-products";
interface BestSellingCarouselProps {
  params: { locale: string };
}

export async function BestSellingCarousel({
  params,
}: BestSellingCarouselProps) {
  //get best selling function
  const result = await getBestSelling({ limit: 6 });

  //handling empty state
  if (!result?.data || result.data.length === 0) {
    return <EmptyState />;
  }

  //locale direction
  const isRTL = params?.locale === "ar";

  return (
    <Carousel
      opts={{
        align: "start",
        direction: isRTL ? "rtl" : "ltr",
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
      <CarouselPrevious className="-start-5 bg-maroon-500 hover:bg-maroon-600 text-white hover:text-white w-10 h-10 border-0 rtl:left-auto rtl:-right-5" />
      <CarouselNext className="-end-4 bg-maroon-500 hover:bg-maroon-600 text-white hover:text-white w-10 h-10 border-0 rtl:right-auto rtl:-left-4" />
    </Carousel>
  );
}
