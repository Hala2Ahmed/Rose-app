import TopSellingProducts from "./_components/top-selling-products";
import LowStockProducts from "./_components/low-stock-products";
import { getServerSession } from "next-auth";
import Forbidden from "../../forbidden";
import { Suspense } from "react";
import AllCategoriesStatsSkeleton from "@/components/skeletons/categories-stats.sekelton";
import StatisticsCardSkeleton from "@/components/skeletons/statistics-card.skeleton";
import AllCategoriesStats from "./_components/all-categories-stats";
import AllStatsCard from "./_components/all-statistics/all-stats-card";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    return Forbidden();
  }

  return (
    <>
      {/* First Section Statstics */}
      <div className="mx-4 my-6 space-y-6">
        <div className="md:flex gap-6">
          {/* statstics card for all items */}
          <Suspense fallback={<StatisticsCardSkeleton />}>
            <AllStatsCard />
          </Suspense>
          {/* statstics card for all categories */}
          <Suspense fallback={<AllCategoriesStatsSkeleton />}>
            <AllCategoriesStats />
          </Suspense>
        </div>
        <div>
          <div className="md:flex gap-6">
            <TopSellingProducts />
            <LowStockProducts />
          </div>
        </div>
      </div>
    </>
  );
}
