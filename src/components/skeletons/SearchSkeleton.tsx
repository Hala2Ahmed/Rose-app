"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/tailwind-merge";

export interface SearchSkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Number of skeleton items to show */
  itemCount?: number;
  /** Layout: list (vertical stack) or grid */
  layout?: "list" | "grid";
  className?: string;
}

const DEFAULT_ITEM_COUNT = 4;

export function SearchSkeleton({
  itemCount = DEFAULT_ITEM_COUNT,
  layout = "list",
  className,
  ...rest
}: SearchSkeletonProps) {
  const count = Math.max(1, Math.min(itemCount, 12));

  return (
    <div
      className={cn(
        "p-2",
        layout === "list" && "space-y-2",
        layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-3",
        className
      )}
      role="status"
      aria-label="Loading search results"
      aria-busy="true"
      {...rest}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex gap-3 p-3 rounded-lg",
            layout === "grid" && "flex-col"
          )}
        >
          <Skeleton
            className={cn(
              "shrink-0 rounded-lg",
              layout === "list" ? "w-14 h-14" : "w-full aspect-square max-w-24"
            )}
            aria-hidden
          />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-md" aria-hidden />
            <Skeleton className="h-3 w-20 rounded-md" aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
}
