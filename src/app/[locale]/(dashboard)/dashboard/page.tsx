import { Suspense } from "react";
import AllCategoriesStatsSkeleton from "@/components/skeletons/categories-stats.sekelton";
import StatisticsCardSkeleton from "@/components/skeletons/statistics-card.skeleton";
import AllCategoriesStats from "./_components/all-categories-stats";
import AllStatsCard from "./_components/all-statistics/all-stats-card";

export default function Page() {
  return (
    <div className="bg-zinc-50 h-screen">
      {/* First Section Statstics */}
      <div className="md:flex gap-6 pt-6  mb-5">
        {/* statstics card for all items */}
        <Suspense fallback={<StatisticsCardSkeleton />}>
          <AllStatsCard />
        </Suspense>
        {/* statstics card for all categories */}
        <Suspense fallback={<AllCategoriesStatsSkeleton />}>
          <AllCategoriesStats />
        </Suspense>
      </div>
    </div>
  );
}
