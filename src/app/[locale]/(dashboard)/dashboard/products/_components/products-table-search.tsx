"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function ProductsTableSearch() {
  // Translation
  const t = useTranslations("common");

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hooks
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("search", debouncedValue);
      params.set("page", "1");
    } else {
      params.delete("search");
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <SearchInput
      placeholder={t("search")}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full mb-5"
    />
  );
}
