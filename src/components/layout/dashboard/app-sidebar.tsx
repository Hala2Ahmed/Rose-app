import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import Header from "./header"
import Footer from "./footer"
import SidebarContentMenu from "./sidebar-content"
import { useLocale } from "next-intl"

export function AppSidebar() {
    //Translation
    const locale = useLocale();
    const isRTL = locale == "ar";

    return (
        <Sidebar
            className="w-303 flex flex-col items-center justify-between"
            side={isRTL ? "right" : "left"}>
            {/* Header */}
            <Header />
            {/* Content */}
            <SidebarContent className="px-8 pt-6">
                <SidebarContentMenu />
            </SidebarContent>
            {/*Footer */}
            <Footer />
        </Sidebar>
    )
}