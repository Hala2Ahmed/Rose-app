import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

return (
  <div className="min-h-screen bg-zinc-900 flex">
    <DashboardSidebar user={session.user} />

    <main className="w-[1101px] h-[757px]  flex flex-col gap-6 overflow-auto pb-4 md:pb-0">
      {children}
    </main>
  </div>
);
}
