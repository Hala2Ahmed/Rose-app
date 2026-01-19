"use client";

import React from "react";
import { usePathname, useRouter } from "../../../i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils/tailwind-merge";

type Props = {
  className?: string;
};
const LanguageSwitcher = ({ className }: Props) => {
  // Translation
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  function switchLanguage() {
    router.push(
      {
        pathname,
        query: Object.fromEntries(
          new URLSearchParams(location.search).entries(),
        ),
      },
      {
        locale: locale == "ar" ? "en" : "ar",
      },
    );
  }

  return (
    <Button
      onClick={switchLanguage}
      variant={"ghost"}
      className={cn(
        "text-zinc-700 dark:text-zinc-50 rounded-none shadow-none",
        className,
      )}>
      {locale == "ar" ? "English" : "العربية"}
    </Button>
  );
};

export default LanguageSwitcher;
