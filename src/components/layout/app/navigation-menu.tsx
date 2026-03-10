"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import React from "react";

type NavigationMenuProps = {
  navLinks: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];
};
export default function NavigationMenu({ navLinks }: NavigationMenuProps) {
  //navigation
  const pathname = usePathname();

  return (
    <nav className="flex justify-center bg-maroon-700 text-zinc-50 dark:bg-softPink-200 dark:text-zinc-800">
      <ul className="flex items-center text-sm">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-3 text-base font-medium font-primary relative",
                  isActive
                    ? "text-softPink-200 dark:text-maroon-800 after:absolute after:left-0 after:bottom-0 after:h-[0.125rem] after:w-full after:bg-softPink-300 dark:after:bg-maroon-800"
                    : "text-zinc-50 dark:text-zinc-800 hover:text-softPink-100 dark:hover:text-maroon-700",
                )}>
                {link.icon}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
