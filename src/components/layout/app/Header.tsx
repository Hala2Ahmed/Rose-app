"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
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
import { useSession } from "next-auth/react";
import InfoUser from "./info-user";
import HeaderSearch from "./header/header-search";

// Header                                  

function Header() {
  const pathname = usePathname();
  const session = useSession();
  const token = session?.data?.accessToken;
  const firstName = session?.data?.user.firstName;

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
            priority
          />
        </Link>

        {/* Search Bar */}
        <HeaderSearch />

        {/* User Actions */}
        <div className="flex items-center gap-6 text-gray-700 dark:text-zinc-50">
          <InfoUser />

          <div className="flex items-center gap-4 px-4 border-x border-zinc-200 dark:border-zinc-700">
            <Heart className="h-5 w-5 cursor-pointer" />
            <ShoppingCart className="h-5 w-5 cursor-pointer" />
            <Notifications notificationCount={5} />
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
                    "flex items-center justify-center gap-2 px-3 py-3 text-base font-medium font-primary relative transition-colors duration-200",
                    isActive
                      ? "text-softPink-200 dark:text-maroon-800 after:absolute after:left-0 after:bottom-0 after:h-[0.125rem] after:w-full after:bg-softPink-300 dark:after:bg-maroon-800"
                      : "text-zinc-50 dark:text-zinc-800 hover:text-softPink-100 dark:hover:text-maroon-700"
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
