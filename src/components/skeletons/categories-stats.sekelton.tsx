import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllCategoriesStatsSkeleton() {
  return (
    <Card className="md:w-[582px] p-6 max-h-[390px] overflow-auto scrollbar-hide  shadow-none border-white">
      <Skeleton className="h-8 w-40 mb-4" />

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between border-b pb-3 mb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      ))}
    </Card>
  );
}
