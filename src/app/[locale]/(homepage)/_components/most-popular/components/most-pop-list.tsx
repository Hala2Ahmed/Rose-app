import { getBestSelling } from "@/lib/api/get-best-selling";

import React from "react";

import EmptyProductState from "@/components/shared/empty-products";

import Link from "next/link";

import { ArrowRight } from "lucide-react";
import BestSellingCard from "../../best-selling/components/best-selling-card";

interface MostPopularListProps {
  searchParams?: { occasion?: string; limit?: number };
}
export default async function MostPopularList({
  searchParams,
}: MostPopularListProps) {
  const occasionId = searchParams?.occasion;

  const results = await getBestSelling({ occasion: occasionId, limit: 12 });

  //Empty state
  if (results.data.length == 0) {
    return <EmptyProductState />;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-6 min-h-96">
        {results.data.map((result) => (
          <BestSellingCard data={result} key={result._id} />
        ))}
      </div>
      <Link
        className="text-maroon-700 font-medium w-full justify-end  relative inline-flex items-center gap-2 mt-14 hover:text-maroon-800 transition-colors"
        href={"/products"}>
        View More
        <ArrowRight className="w-5 h-5" />
      </Link>
    </>
  );
}
