import React, { Suspense } from "react";
import AllOccasionsHeader from "./_components/all-occasions-header";
import { AllOccasionsTable } from "./_components/all-occasions-table";
import { AllOccasionsTableSkeleton } from "@/components/skeletons/occasions-table.skeleton";

export default async function OccasionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const query = search ?? "";

  return (
    <div className="max-w-[68.813rem] m-5 rounded-2xl p-6">
      <AllOccasionsHeader />
      <Suspense fallback={<AllOccasionsTableSkeleton />}>
        <AllOccasionsTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
}
