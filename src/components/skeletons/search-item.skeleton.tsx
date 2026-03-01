

// Skeleton for one search item (matches design: small image, name/price stack, rating)
function SearchItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-700 last:border-none animate-pulse">
      <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3.5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3.5 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
      </div>
    </div>
  );
}

interface SearchDropdownSkeletonProps {
  count?: number;
  /** When true, only render the list (no outer container); use when embedding in dropdown */
  embedded?: boolean;
}

export default function SearchDropdownSkeleton({ count = 5, embedded = false }: SearchDropdownSkeletonProps) {
  const list = (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SearchItemSkeleton key={i} />
      ))}
    </>
  );

  if (embedded) return list;

  return (
    <div className="absolute mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-50 max-h-[400px] overflow-y-auto">
      {list}
    </div>
  );
}
