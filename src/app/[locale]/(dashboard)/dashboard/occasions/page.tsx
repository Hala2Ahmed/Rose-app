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
    </div>
  );
}
