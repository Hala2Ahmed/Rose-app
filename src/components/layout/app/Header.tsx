import React from "react";
import Image from "next/image";
import Link from "next/link";
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
import Notifications from "./notifications/index";
import LanguageSwitcher from "./language-switcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import InfoUser from "./info-user";
import HeaderSearch from "./header/header-search";
import CartItems from "./cart-items";
import ModeToggle from "./mode-toggle";
import NavigationMenu from "./navigation-menu";
import UserDropDown from "@/components/shared/user-dropdown";

// Header

async function Header() {
  //get user info from server side on first page loading to avoid flashing of info
  const session = await getServerSession(authOptions);

  //Nav Links
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
    <header className="w-full bg-white shadow-sm dark:bg-zinc-800">
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
        {session?.user ? <UserDropDown initialData={session} /> : <InfoUser />}
        <div className="flex items-center gap-6 text-gray-700 dark:text-zinc-50">
          <div className="flex items-center gap-4 px-4 border-x border-zinc-200 dark:border-zinc-700">
            <Heart className="h-5 w-5 cursor-pointer" />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
              <CartItems />
            </Link>
            <Notifications notificationCount={5} />
            <ModeToggle />
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* ==================== Navigation Menu ==================== */}
      <NavigationMenu navLinks={navLinks} />
    </header>
  );
}

export default Header;
