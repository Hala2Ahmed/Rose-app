
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Search,
  User,
  Heart,
  ShoppingCart,
  Gift,
  ClipboardList,
  PartyPopper,
  Headset,
} from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import Notifications from "./notifications/index";
import LanguageSwitcher from "./language-switcher";

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    {
      href: "/products",
      label: "Products",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      href: "/categories",
      label: "Categories",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      href: "/occasions",
      label: "Occasions",
      icon: <PartyPopper className="h-5 w-5" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Headset className="h-5 w-5" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <Info className="h-5 w-5" />,
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm dark:bg-zinc-900">
      {/* ==================== Top Header Section ==================== */}
      <div className="flex items-center justify-between px-9 py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/brands/logo.png"
            alt="Logo"
            width={85}
            height={80}
          />
        </Link>

        {/* Search Bar */}
        <div className="relative w-full dark:bg-zinc-700 rounded-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-50" />
          <input
            type="text"
            placeholder="What awesome gift are you looking for?"
            className="w-full h-[3.25rem] rounded-xl border border-zinc-300 dark:border-zinc-600 pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-0 focus:border-zinc-300"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6 text-gray-700 dark:text-zinc-50">
          <Link href="/login" className="flex items-center gap-1 text-sm">
            <User className="h-5 w-5" />
            Login
          </Link>

          <div className="flex items-center gap-4 px-4 border-x border-zinc-200">
            <Heart className="h-5 w-5 cursor-pointer" />
            <ShoppingCart className="h-5 w-5 cursor-pointer" />
              <Notifications notificationCount={5}/>
            
          </div>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* ==================== Navigation Menu ==================== */}
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
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
