"use client";

import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const CustomDropDownMenu = () => {
    const { data } = useSession();

    return (
        <DropdownMenuContent
            side="top"
            className="w-56 text-zinc-700 text-base font-medium"
        >
            <DropdownMenuItem className="h-11">
                <span className="text-maroon-700 dark:text-maroon-500 font-semibold leading-5">
                    {data?.user.firstName} {data?.user.lastName}
                </span>
            </DropdownMenuItem>
            <Link href={"/dashboard/account"}>
                <DropdownMenuItem className="h-11 border-y hover:rounded-lg rounded-none cursor-pointer">
                    <UserRound className="" />
                    <span>Account</span>
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="h-11 cursor-pointer" onClick={() => signOut()}>
                <LogOut />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default CustomDropDownMenu;
