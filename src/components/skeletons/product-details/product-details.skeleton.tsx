"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-[4rem] my-[3rem]">
      {/* Left side (Gallery skeleton) */}
      <div className="flex flex-col gap-[0.625rem] max-h-[32.7rem]">
        {/* Main Image */}
        <Skeleton className="w-[37.8rem] h-[25.1rem] rounded-xl" />

        {/* Thumbnails */}
        <div className="grid grid-cols-6 gap-x-[0.625rem]">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-[5.7rem] h-[6.9rem] rounded-md" />
          ))}
        </div>
      </div>

      {/* Right side (Product info skeleton) */}
      <div className="flex flex-col flex-1 max-h-[32.7rem]">
        {/* Title */}
        <Skeleton className="h-[2rem] w-2/3 rounded mb-[1rem]" />

        {/* Price + Stock */}
        <div className="flex items-center gap-[1rem] mb-[1rem]">
          <Skeleton className="h-[2rem] w-[6rem] rounded" />
          <Skeleton className="h-[2rem] w-[6rem] rounded" />
          <Skeleton className="h-[1.5rem] w-[8rem] rounded-full" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[0.5rem] mb-[1rem]">
          <Skeleton className="h-[1.25rem] w-[1.25rem] rounded-full" />
          <Skeleton className="h-[1rem] w-[8rem] rounded" />
        </div>

        {/* Description */}
        <div className="space-y-[0.5rem] mb-[1rem]">
          <Skeleton className="h-[1rem] w-full rounded" />
          <Skeleton className="h-[1rem] w-5/6 rounded" />
          <Skeleton className="h-[1rem] w-4/6 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-[0.625rem] mt-auto">
          <Skeleton className="h-[2.5rem] w-[3rem] rounded-md" />
          <Skeleton className="h-[2.5rem] flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}
