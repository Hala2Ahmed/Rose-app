

"use client";

import React from "react";

/**
 * Skeleton for ONE product card
 * Matches BestSellingCard layout & dimensions
 */
export function SingleCardSkeleton() {
  return (
    <article className="w-full relative animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>

      {/* Title Skeleton */}
      <div className="mt-2 h-6 bg-gray-200 rounded w-3/4" />

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-2">
        <div>
          {/* Stars Skeleton */}
          <div className="flex gap-1 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>

          {/* Price Skeleton */}
          <div className="h-5 bg-gray-200 rounded w-32" />
        </div>

        {/* Cart Button Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    </article>
  );
}

/**
 * Alias for readability (1 card only)
 */
export default function ProductCardSkeleton() {
  return <SingleCardSkeleton />;
}
