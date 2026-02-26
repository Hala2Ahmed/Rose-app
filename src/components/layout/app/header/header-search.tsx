"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "./search-bar";
import { useSearch } from "@/hooks/use-search";
import SearchDropdownSkeleton from "@/components/skeletons/search-item.skeleton";

interface Product {
  _id: string;
  slug: string;
  title: string;
  imgCover: string;
  price: number;
  rateAvg: number;
  rateCount: number;
  quantity: number;
}

export default function HeaderSearch() {
  const router = useRouter();
  const locale = useLocale();

  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearch(open, debouncedValue);

  const products: Product[] = useMemo(
    () => data?.pages.flatMap((page) => page.products) || [],
    [data]
  );

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightRegex = useMemo(() => {
    if (!debouncedValue) return null;
    return new RegExp(`(${escapeRegExp(debouncedValue)})`, "gi");
  }, [debouncedValue]);

  const highlightText = useCallback(
    (text: string) => {
      if (!highlightRegex) return text;
      return text.split(highlightRegex).map((part, i) =>
        highlightRegex.test(part) ? (
          <span key={i} className="text-maroon-500 font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      );
    },
    [highlightRegex]
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      router.push(`/${locale}/products/${product.slug}`);
      setOpen(false);
      setActiveIndex(-1);
    },
    [router, locale]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, products.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < products.length) {
        handleProductClick(products[activeIndex]);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative w-full">
      <div ref={wrapperRef}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {open && (
          <>
            {debouncedValue.length < 2 ? (
              <div className="absolute mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-50 p-4 text-center">
                <p className="text-sm text-zinc-500">
                  Type at least 2 characters to search
                </p>
              </div>
            ) : isFetching && products.length === 0 ? (
              <SearchDropdownSkeleton count={5} />
            ) : products.length === 0 ? (
              <div className="absolute mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-50 p-4 text-center">
                <p className="text-sm text-zinc-500">No products found</p>
              </div>
            ) : (
              <div
                id="scrollableSearchDropdown"
                className="absolute mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-50 max-h-[400px] overflow-y-auto"
              >
                <InfiniteScroll
                  dataLength={products.length}
                  next={() => {
                    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                  }}
                  hasMore={!!hasNextPage}
                  loader={
                    isFetchingNextPage && (
                      <p className="p-3 text-center text-xs text-zinc-400">
                        Loading more...
                      </p>
                    )
                  }
                  scrollableTarget="scrollableSearchDropdown"
                >
                  {products.map((product, index) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className={`flex items-center gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800 last:border-none transition cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                        index === activeIndex
                          ? "bg-zinc-100 dark:bg-zinc-800"
                          : ""
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                        <Image
                          src={product.imgCover}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex items-center justify-between w-full">
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                          {highlightText(product.title)}
                        </p>

                        <div className="flex items-center gap-4">
                          <span className="text-base font-semibold text-zinc-900 dark:text-white">
                            {product.price} EGP
                          </span>

                          <div className="flex items-center text-sm whitespace-nowrap gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                              {product.rateAvg?.toFixed(1) ?? "0.0"}/5
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              ({product.rateCount || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
