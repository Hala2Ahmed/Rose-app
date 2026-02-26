'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { CalendarHeart, ClipboardList, LayoutDashboard, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

export default function SidebarContentMenu() {
    //routes 
    const pathName = usePathname();

    //Translation
    const t = useTranslations("dashboard-layout");

    //variables 
    const menus = [
        {
            name: t("overview"),
            icon: LayoutDashboard,
            url: "/dashboard",
        },
        {
            name: t("categories"),
            icon: ClipboardList,
            url: "/dashboard/categories",
        },
        {
            name: t("occasions"),
            icon: CalendarHeart,
            url: "/dashboard/occasions",
        },
        {
            name: t("products"),
            icon: Package,
            url: "/dashboard/products",
        }
    ];

    return (
        <SidebarMenu className="flex flex-col gap-4">
            {menus.map((menu) => {
                const isActive = pathName === menu.url;
                return (
                    <SidebarMenuItem key={menu.name} className=" text-zinc-800 w-full">
                        <SidebarMenuButton className="h-11" asChild>
                            <Link href={menu.url}
                                className={cn(
                                    "flex items-center gap-2 py-2.5 ps-2.5 w-full",
                                    isActive
                                        ? `bg-maroon-50 text-maroon-600 hover:!bg-maroon-100 hover:text-maroon-700
                                            dark:hover:!text-maroon-800`
                                        : `hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-200
                                            dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-200`
                                )}
                            >
                                <menu.icon width={25} height={25} />
                                <span className="font-bold text-lg leading-normal">{menu.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}
