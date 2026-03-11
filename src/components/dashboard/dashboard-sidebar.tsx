"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Gift,
  Package,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import type { ProfileUser } from "@/lib/types/profile";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/categories", label: "Categories", icon: FolderTree },
  { href: "/dashboard/occasions", label: "Occasions", icon: Gift },
  { href: "/dashboard/products", label: "Products", icon: User },
] as const;

interface DashboardSidebarProps {
  user: ProfileUser;
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center justify-center gap-2 h-10 px-3 rounded-lg text-sm font-medium transition-colors md:justify-start",
              isActive
                ? "bg-maroon-600 text-white dark:bg-maroon-600 dark:text-white"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline">{label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[250px] flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="p-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative w-8 h-8">
            <Image
              src="/assets/brands/logo.png"
              alt="Rose"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">
            Rose App
          </span>
        </div>

        <div className="p-4">
          <Link
            href="/"
            className="flex items-center justify-center w-full h-10 rounded-lg bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-medium transition-colors"
          >
            Preview website
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0">
            {user.photo ? (
              <Image
                src={
                  user.photo.startsWith("http")
                    ? user.photo
                    : `${process.env.NEXT_PUBLIC_IMAGE_API_URL ?? ""}/${user.photo}`
                }
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-medium">
                {user.firstName?.[0] ?? "?"}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-14 px-2 py-1 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 md:hidden"
        aria-label="Main navigation"
      >
        <NavLinks pathname={pathname} />
      </nav>
    </>
  );
}
