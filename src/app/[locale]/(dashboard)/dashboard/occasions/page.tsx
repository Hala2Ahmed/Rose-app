<<<<<<< HEAD
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";

export default async function OccasionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <DashboardBreadcrumb items={[{ label: "Occasions" }]} />
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 md:p-8">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
          Occasions
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Coming soon.
        </p>
      </div>
=======
import React, { Suspense } from "react";
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
    <div className="max-w-[68.813rem] m-5">
      <Suspense fallback={<AllOccasionsTableSkeleton />}>
        <AllOccasionsTable page={currentPage} query={query} />
      </Suspense>
>>>>>>> 08bdac9a35da0bf634688f8a898179289654f02b
    </div>
  );
}
