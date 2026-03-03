"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInputControl() {
  //translations
  const t = useTranslations("common");

  //navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //state
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const debouncedValue = useDebounce(inputValue, 100);
  const isMounted = useRef(false);

  //effect
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const currentSearch = searchParams.get("search") || "";

    if (debouncedValue === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search"); // Clean up empty param
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <SearchInput
      placeholder={t("search")}
      className="my-5"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
