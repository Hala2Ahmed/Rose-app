import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils/tailwind-merge";

import { useTranslations } from "next-intl";

import React from "react";

type Props = {
  translationKey: string;
  linkHref: string;
  className?: string;
};

export default function FormFooter({
  translationKey,
  linkHref,
  className,
}: Props) {
  //translations
  const t = useTranslations();

  return (
    <div
      className={cn(
        "pt-5 font-medium text-sm text-center border-t-2 dark:border-zinc-600 mt-9 first-letter:capitalize",
        className,
      )}>
      {t.rich(translationKey, {
        link: (chunks: React.ReactNode) => (
          <Link
            className="text-maroon-700 dark:text-pink-300 font-bold ms-1"
            href={linkHref}>
            {chunks}
          </Link>
        ),
      })}
    </div>
  );
}
