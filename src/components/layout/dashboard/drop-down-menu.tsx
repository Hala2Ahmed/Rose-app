"use client";

import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from "next-intl";
import Link from 'next/link';
import React from 'react';

export function CustomDropDownMenu() {
    // User Data
    const { data } = useSession();

    //Translation
    const t = useTranslations("dashboard-layout");

    return (
        <DropdownMenuContent
            side="top"
            className="w-56 text-zinc-700 text-base font-medium"
        >
            <DropdownMenuItem className="h-11 rtl:flex-row-reverse">
                <span className="text-maroon-700 dark:text-maroon-500 font-semibold leading-5">
                    {data?.user.firstName} {data?.user.lastName}
                </span>
            </DropdownMenuItem>
            <Link href={"/dashboard/account"}>
                <DropdownMenuItem className="h-11 border-y hover:rounded-lg rounded-none cursor-pointer rtl:flex-row-reverse">
                    <UserRound className="" />
                    <span>{t("account")}</span>
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="h-11 cursor-pointer rtl:flex-row-reverse" onClick={() => signOut()}>
                <LogOut />
                <span>{t("logout")}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}