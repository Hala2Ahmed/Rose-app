// "use client";

// import React from "react";

// /**
//  * Skeleton for ONE search result item
//  */
// export function SearchItemSkeleton() {
//   return (
//     <div className="flex items-center justify-between gap-4 p-4 animate-pulse border-b last:border-b-0">
//       {/* Left: Image */}
//       <div className="relative w-16 h-16 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
//       </div>

//       {/* Middle: Title + Price */}
//       <div className="flex-1 flex flex-col gap-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/2" />
//       </div>

//       {/* Right: Rating */}
//       <div className="flex items-center gap-1">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
//         ))}
//       </div>
//     </div>
//   );
// }

// /**
//  * Skeleton for the full search dropdown
//  */
// export default function SearchDropdownSkeleton({ count = 5 }: { count?: number }) {
//   return (
//     <div className="absolute mt-2 w-full rounded-xl border bg-white shadow-xl z-50 max-h-[400px] overflow-y-auto">
//       {Array.from({ length: count }).map((_, i) => (
//         <SearchItemSkeleton key={i} />
//       ))}
//     </div>
//   );
// }


// Skeleton for one search item
function SearchItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 animate-pulse border-b last:border-b-0">
      <div className="relative w-16 h-16 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}

// Skeleton for the full dropdown
function SearchDropdownSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute mt-2 w-full rounded-xl border bg-white shadow-xl z-50 max-h-[400px] overflow-y-auto">
      {Array.from({ length: count }).map((_, i) => (
        <SearchItemSkeleton key={i} />
      ))}
    </div>
  );
}
