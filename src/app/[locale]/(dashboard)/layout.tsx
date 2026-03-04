import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import DashboardProvider from "@/components/providers/dashboard/dashboard.provider";
import { Breadcrumbs } from "@/components/layout/dashboard/bread-crumbs";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <DashboardProvider>
            {/* Side menu */}
            <aside>
                <AppSidebar />
                <SidebarTrigger />
            </aside>

            <div className="ms-14 w-full flex flex-col gap-2">
                <Breadcrumbs />
                {children}
            </div>
        </DashboardProvider>
    );
}
