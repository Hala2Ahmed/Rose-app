import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";
import { AccountSettingsForm } from "@/features/profile/components/account-settings-form";

export default async function AccountSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 ">
      <DashboardBreadcrumb items={[{ label: "Account" }]} />
      <AccountSettingsForm user={session.user} />
    </div>
  );
}
