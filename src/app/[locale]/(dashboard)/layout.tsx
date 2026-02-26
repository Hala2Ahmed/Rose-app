import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import DashboardProvider from "@/components/providers/dashboard/dashboard.provider";

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

            <div className="ms-14">
                {children}
            </div>
        </DashboardProvider>
    );
}
