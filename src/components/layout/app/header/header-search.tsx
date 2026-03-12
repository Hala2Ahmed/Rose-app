"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "./search-bar";
import { useSearch } from "@/hooks/use-search";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import type { SearchProduct } from "@/lib/types/search.types";
import SearchDropdownSkeleton from "@/components/skeletons/search-item.skeleton";

const MIN_KEYWORD_LENGTH = 1;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HeaderSearch() {
  const router = useRouter();
  const locale = useLocale();

  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    products,
    debouncedKeyword,
    hasEnoughChars,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useSearch({ open, keyword: searchValue });

  /* Highlight search keyword */
  const highlightRegex = useMemo(() => {
    if (!debouncedKeyword) return null;
    return new RegExp(`(${escapeRegExp(debouncedKeyword)})`, "gi");
  }, [debouncedKeyword]);

  const highlightText = useCallback(
    (text: string) => {
      if (!highlightRegex) return text;

      const parts = text.split(highlightRegex);
      return parts.map((part, i) =>
        part.toLowerCase() === debouncedKeyword?.toLowerCase() ? (
          <span key={i} className="text-maroon-600 dark:text-maroon-400 font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      );
    },
    [highlightRegex, debouncedKeyword]
  );

  /* Navigation on click */
  const handleProductClick = useCallback(
    (product: SearchProduct) => {
      router.push(`/${locale}/products/${product.slug}`);
      setOpen(false);
      setActiveIndex(-1);
    },
    [router, locale]
  );

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const { onKeyDown: onKeyDownNav } = useKeyboardNavigation({
    itemCount: products.length,
    isOpen: open,
    onSelect: (index) => handleProductClick(products[index]),
    onClose: closeDropdown,
    enabled: true,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDownNav(e, activeIndex, setActiveIndex);
    },
    [onKeyDownNav, activeIndex]
  );

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  const showMinCharsMessage = open && searchValue.trim().length > 0 && searchValue.trim().length < MIN_KEYWORD_LENGTH;
  const showLoading = open && hasEnoughChars && isFetching && products.length === 0;
  const showResults = open && hasEnoughChars;
  const isSuggestions = !debouncedKeyword || debouncedKeyword.length < MIN_KEYWORD_LENGTH;

  return (
    <header className="relative w-full">
      <div ref={wrapperRef}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {/* Min chars message */}
        {showMinCharsMessage && (
          <div className="absolute mt-2 w-full rounded-xl overflow-hidden shadow-xl z-50">
            <div className="bg-white dark:bg-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-500">
                Type at least {MIN_KEYWORD_LENGTH} character to search
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {showLoading && (
          <div className="absolute mt-2 w-full rounded-xl overflow-hidden shadow-xl z-50">
            <div className="bg-white dark:bg-zinc-800">
              <SearchDropdownSkeleton count={5} embedded />
            </div>
          </div>
        )}

        {/* Search results */}
        {showResults && (
          <div className="absolute mt-2 w-full rounded-xl overflow-hidden shadow-xl z-50 max-h-[420px] flex flex-col">
            <div className="bg-white dark:bg-zinc-800 flex flex-col min-h-0">
              {isSuggestions && (
                <p className="px-4 pt-4 pb-2 font-primary font-semibold text-base text-maroon-600 dark:text-maroon-700 border-b border-zinc-200/80 dark:border-zinc-700">
                  Products you may like:
                </p>
              )}

              <div id="scrollableSearchDropdown" className="overflow-y-auto max-h-[400px]">
                <InfiniteScroll
                  dataLength={products.length}
                  next={() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }}
                  hasMore={!!hasNextPage}
                  loader={isFetchingNextPage && <p className="p-3 text-center text-xs text-zinc-500">Loading more...</p>}
                  scrollableTarget="scrollableSearchDropdown"
                >
                  {products.map((product, index) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className={`flex items-start gap-4 px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-700 last:border-none cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700/50 ${
                        index === activeIndex ? "bg-zinc-100 dark:bg-zinc-700/50" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="relative w-[80px] h-[80px] p-4 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                        <Image src={product.imgCover} alt={product.title} fill className="object-cover rounded-sm" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-center">
                          <p className="font-primary font-semibold text-sm text-zinc-800 dark:text-zinc-200 truncate">
                            {highlightText(product.title)}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-primary font-normal text-sm text-zinc-800 dark:text-zinc-200">
                              Rating: {(product.rateAvg ?? 0).toFixed(1)}/5
                            </span>
                            <span className="font-primary font-medium text-sm text-blue-600 dark:text-blue-400">
                              ({product.rateCount ?? 0} ratings)
                            </span>
                          </div>
                        </div>

                        <p className="mt-1 flex items-center gap-1">
                          <span className="font-primary font-bold text-xl text-zinc-900 dark:text-white">
                            {product.priceAfterDiscount ?? product.price}
                          </span>
                          <span className="font-primary font-normal text-base text-zinc-500">
                            EGP
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}