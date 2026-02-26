"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="max-w-[782px] mb-12">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Items Skeleton */}
      <div className="border border-zinc-200 p-5 rounded-xl max-h-[50rem] overflow-y-auto cart-scroll space-y-6">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between border-b last:border-b-0 border-zinc-200 pb-5"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="w-28 h-36 rounded-lg" />

              <div className="flex flex-col justify-between h-full w-[360px]">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-56" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-40" />
              </div>
            </div>

            <div className="flex flex-col justify-between items-end h-[140px] ms-32">
              <Skeleton className="h-10 w-[100px]" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
