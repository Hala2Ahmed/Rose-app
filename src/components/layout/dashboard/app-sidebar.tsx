import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import Header from "./header"
import Footer from "./footer"
import SidebarContentMenu from "./sidebar-content"

export function AppSidebar() {
    return (
        <Sidebar className="w-303 flex flex-col items-center justify-between">
            <Header />
            <SidebarContent className="px-8 pt-6">
                <SidebarContentMenu />
            </SidebarContent>
            <Footer />
        </Sidebar>
    )
}