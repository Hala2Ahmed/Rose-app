import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopSellingProductsSkeleton() {
  return (
    <Card className="rounded-2xl border-none shadow-none bg-white w-[33.5rem] h-[28rem]">
      <CardContent className="p-6 space-y-6">
        {/* Title Skeleton */}
        <Skeleton className="h-7 w-52 rounded-md" />

        {/* List Skeleton */}
        <div className="space-y-2.5 h-[21.5rem]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2.5 py-2 rounded-sm bg-zinc-100"
            >
              <div className="flex items-center gap-2 w-full">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-10 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
