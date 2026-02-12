import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Info,
  Search,
  Heart,
  ShoppingCart,
  Gift,
  ClipboardList,
  PartyPopper,
  Headset,
  ChevronDown,
  UserRound,
  MapPinHouse,
  ScrollText,
  Settings,
} from "lucide-react";
import Notifications from "./notifications/index";
import LanguageSwitcher from "./language-switcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import InfoUser from "./info-user";
import NavigationMenu from "./navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartItems from "./cart-items";
import LogOutButton from "@/components/shared/logout-button";
import { getTranslations } from "next-intl/server";

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

async function Header() {
  //get user info from server insetad of client
  const session = await getServerSession(authOptions);

  //translations
  const t = await getTranslations("header");

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
          {session?.user ? (
            <div className="flex items-center">
              <p className="text-xs text-zinc-500 m-0 p-0 font-normal">
                Hello{" "}
                <span className="text-maroon-700 dark:text-softPink-200 font-medium text-base">
                  {session.user.firstName}
                </span>
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ChevronDown className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <p className="capitalize text-maroon-700 font-semibold text-sm">
                        {session.user.firstName} {session.user.lastName}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-100" />

                    <Link href={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <UserRound />
                        {t("my-profile")}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <MapPinHouse />
                      {t("addresses")}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ScrollText /> {t("orders")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-zinc-100" />
                  <DropdownMenuItem>
                    <Settings /> {t("dashboard")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-100" />

                  {/* separated for client side functionality */}
                  <LogOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <InfoUser />
          )}

          <div className="flex items-center gap-4 px-4 border-x border-zinc-200">
            <Heart className="h-5 w-5 cursor-pointer" />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
              <CartItems />
            </Link>
            <Notifications notificationCount={5} />
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu navLinks={navLinks} />
    </header>
  );
}

export default Header;
