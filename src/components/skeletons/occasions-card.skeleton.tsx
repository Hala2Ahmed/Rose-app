// occasions-card-skeleton.tsx
import React from "react";

export default function OccasionsCardSkeleton() {
  return (
    <div className="w-full h-20 relative rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      {/* Image skeleton */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* Title skeleton */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <div className="h-4 bg-gray-400 rounded w-3/4" />
      </div>
    </div>
  );
}
