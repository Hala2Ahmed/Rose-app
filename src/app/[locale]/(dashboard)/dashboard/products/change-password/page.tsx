// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/auth";
// import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";
// import { ChangePasswordForm } from "@/features/profile/components/change-password-form";

// export default async function ChangePasswordPage() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user) {
//     redirect("/login");
//   }

//   return (
//     <div className="p-6 md:p-8 max-w-4xl mx-auto">
//       <DashboardBreadcrumb
//         items={[
//           { label: "Account Settings", href: "/dashboard/account" },
//           { label: "Change Password" },
//         ]}
//       />
//       <ChangePasswordForm />
//     </div>
//   );
// }



import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 ">
      <DashboardBreadcrumb
        items={[
          { label: "Account Settings", href: "/dashboard/account" },
          { label: "Change Password" },
        ]}
      />

      <ChangePasswordForm />
    </div>
  );
}