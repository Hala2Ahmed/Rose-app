"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDown, User } from "lucide-react";
import LoginPopover from "@/app/[locale]/(site)/(homepage)/_components/login-popover/login-popover";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslations } from "next-intl";

export default function InfoUser() {
  const t = useTranslations("auth.login");
  const { data: session } = useSession();
  const token = session?.accessToken;
  const user = session?.user;
  const firstName = user?.firstName;

  return (
    <HoverCard openDelay={100}>
      <div className="inline-block cursor-pointer">
        {!token ? (
          <HoverCardTrigger asChild>
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm py-1"
            >
              <User className="h-5 w-5" />
              {t("Login")}
            </Link>
          </HoverCardTrigger>
        ) : (
          <div className="w-24 flex justify-between items-center py-1">
            <div>
              <p className="text-zinc-500 -mb-2.5 text-xs">{t("Hello")}</p>
              <h3 className="text-maroon-600 dark:text-softPink-200">
                {firstName}
              </h3>
            </div>
            <ChevronDown className="text-zinc-500" />
          </div>
        )}
      </div>

      {!token && (
        <HoverCardContent
          align="start"
          className="w-[400px] p-0 shadow-2xl rounded-lg overflow-hidden"
        >
          <LoginPopover />
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
