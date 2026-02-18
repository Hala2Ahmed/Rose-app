import React from "react";
import BestSellingCard from "@/app/[locale]/(site)/(homepage)/_components/best-selling/best-selling-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { RecommendedProduct } from "@/lib/types/recommendations";

export default function ProductMayLikeContent({
  data,
}: {
  data: RecommendedProduct[];
}) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ms-6 my-10">
        {data.map((product) => (
          <CarouselItem
            key={product._id}
            className="ps-6 md:basis-1/3 lg:basis-1/4"
          >
            <BestSellingCard data={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-start-5 bg-maroon-500 hover:bg-maroon-600 text-white hover:text-white w-10 h-10 border-0 rtl:left-auto rtl:-right-5 rtl:-rotate-180" />
      <CarouselNext className="-end-4 bg-maroon-500 hover:bg-maroon-600 text-white hover:text-white w-10 h-10 border-0 rtl:right-auto rtl:-left-4 rtl:-rotate-180" />
    </Carousel>
  );
}
