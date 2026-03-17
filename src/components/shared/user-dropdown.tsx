"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  MapPinHouse,
  ScrollText,
  Settings,
  UserRound,
} from "lucide-react";
import LogOutButton from "./logout-button";
import { Link } from "@/i18n/navigation";
import useGetProfileData from "@/app/[locale]/(site)/profile/_hooks/use-get-user-data";
import { useTranslations } from "next-intl";

type InitialDataProps = {
  initialData: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      photo: string;
    };
  };
};
export default function UserDropDown({ initialData }: InitialDataProps) {
  const t = useTranslations("header");
  const { profileData: session } = useGetProfileData();
  const userData = session || initialData;
  console.log(userData, "uu");

  return (
    <>
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="font-sarabun">
          <p className="text-xs text-zinc-500 m-0 p-0 font-normal">
            {t("hello")}
          </p>
          <span className="text-maroon-700 dark:text-softPink-200 font-medium text-base capitalize">
            {userData?.user.firstName}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDown className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="capitalize text-maroon-700 dark:text-softPink-200 font-semibold text-sm">
                  {userData?.user.firstName} {userData?.user.lastName}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-100" />

              {/* Profile Settings */}
              <Link href={"/profile"}>
                <DropdownMenuItem className="cursor-pointer">
                  <UserRound />
                  {t("my-profile")}
                </DropdownMenuItem>
              </Link>

              {/* User Adresses */}
              <DropdownMenuItem>
                <MapPinHouse className="cursor-pointer" />
                {t("addresses")}
              </DropdownMenuItem>

              {/* User Orders */}
              <Link href={"/allOrders"}>
                <DropdownMenuItem className="cursor-pointer">
                  <ScrollText /> {t("orders")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-100" />

            {/* Dashboard */}
            {userData.user.role != "user" && (
              <>
                <Link href={"/dashboard"}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings /> {t("dashboard")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-zinc-100" />
              </>
            )}

            {/* separated button for reusablility */}
            <LogOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
