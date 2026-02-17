"use client";

import { Button } from "@/components/ui/button";
import { Lock, LogOut, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ProfileForm from "./profile-form";
import ChangePasswordForm from "./change-password-form";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

//Variables
const FORM_TYPES = {
  PROFILE: "profile",
  PASSWORD: "password",
} as const;

type FormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];

export default function AccountSideBar() {
  //translations
  const t = useTranslations("profile");

  //state
  const [activeForm, setActiveForm] = useState<FormType>(FORM_TYPES.PROFILE);

  //function
  const handleSignOut = async () => {
    sessionStorage.removeItem("token");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <h2 className="font-bold text-5xl mb-9 mt-5">{t("update-profile")}</h2>

      <div className="flex gap-x-9">
        <div className="bg-zinc-50 dark:bg-zinc-700 p-4 w-[299px] min-h-[720px] flex flex-col justify-between rounded-2xl">
          <nav>
            <ul className="w-full cursor-pointer">
              <li
                className={cn(
                  "flex gap-x-3 mb-3 p-4 transition-all duration-300 ease-in-out rounded-lg",
                  activeForm == FORM_TYPES.PROFILE
                    ? "bg-zinc-800 text-white"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-500",
                )}
                onClick={() => setActiveForm(FORM_TYPES.PROFILE)}>
                <UserRoundPen />
                <span>{t("my-account")}</span>
              </li>
              <li
                className={cn(
                  "flex gap-x-3 p-4 transition-all duration-300 ease-in-out rounded-lg",
                  activeForm == FORM_TYPES.PASSWORD
                    ? "bg-zinc-800 text-white"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-500",
                )}
                onClick={() => setActiveForm(FORM_TYPES.PASSWORD)}>
                <Lock />
                <span>{t("change-password")}</span>
              </li>
            </ul>
          </nav>
          <Button
            onClick={handleSignOut}
            className="w-full bg-zinc-100 hover:bg-zinc-200 justify-start">
            <LogOut className="text-maroon-500 ms-4" />
            <span className="text-maroon-500">{t("logout")}</span>
            <span className="sr-only">log out</span>
          </Button>
        </div>

        {/* Active Form with transitions */}
        <div className="w-[945px] relative">
          <div
            className={cn(
              "transition-opacity duration-200 ease-in-out",
              activeForm === FORM_TYPES.PROFILE
                ? "opacity-100"
                : "opacity-0 absolute inset-0 pointer-events-none",
            )}>
            <ProfileForm />
          </div>
          <div
            className={cn(
              "transition-opacity duration-200 ease-in-out",
              activeForm === FORM_TYPES.PASSWORD
                ? "opacity-100"
                : "opacity-0 absolute inset-0 pointer-events-none",
            )}>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
