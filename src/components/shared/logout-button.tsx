"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function LogOutButton() {
  const t = useTranslations("common");

  const handleSignOut = async () => {
    sessionStorage.removeItem("token");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
      <LogOut /> {t("logout")}
    </DropdownMenuItem>
  );
}
