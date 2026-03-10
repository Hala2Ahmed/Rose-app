import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticsCardSkeleton() {
  return (
    <Card className="md:w-[490px] grid grid-cols-2 py-6 px-6 gap-4 shadow-none border-white ms-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-2xl p-4 w-full bg-zinc-100">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <Skeleton className="w-16 h-7 rounded-md mt-3 mb-2" />
          <Skeleton className="w-24 h-4 rounded-md" />
        </div>
      ))}
    </Card>
  );
}
