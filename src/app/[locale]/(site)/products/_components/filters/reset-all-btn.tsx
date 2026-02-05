"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetAllButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("products.filters");

  // If there are no query params, there's nothing to reset
  const isDisabled = searchParams.size === 0;

  const handleResetAll = () => {
    if (isDisabled) return;
    router.replace(pathname, { scroll: false });
  };

  return (
    <Button
      variant="secondary"
      onClick={handleResetAll}
      disabled={isDisabled}
      className="w-full flex items-center gap-2"
    >
      <RotateCcwIcon size={18} />
      {t("reset-all")}
    </Button>
  );
}