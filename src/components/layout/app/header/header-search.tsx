"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import SearchBar from "./search-bar";
import { useSearch } from "@/hooks/use-search";
import SearchDropdownSkeleton from "./search-item.skeleton"; // Skeleton

interface Product {
  _id: string;
  slug: string;
  title: string;
  imgCover: string;
  priceAfterDiscount: number;
  ratingsAverage?: number | null;
  ratingsQuantity?: number | null;
}

export default function HeaderSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearch(open, searchValue);
  const products: Product[] = data?.pages.flatMap((page) => page.products) || [];

  // -------------------- Scroll --------------------
  const handleScroll = () => {
    if (!listRef.current || !hasNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };

  // -------------------- Highlight --------------------
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-maroon-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // -------------------- Click outside to close --------------------
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------------- Keyboard --------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, products.length - 1));
      listRef.current?.children[activeIndex + 1]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      listRef.current?.children[activeIndex - 1]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < products.length) {
        const product = products[activeIndex];
        window.location.href = `/products/${product.slug}`;
        setOpen(false);
        setActiveIndex(-1);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // -------------------- Render --------------------
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
            {isFetching && products.length === 0 ? (
              <SearchDropdownSkeleton count={5} /> {/* Skeleton أثناء التحميل */}
            ) : products.length === 0 ? (
              <p className="p-4 text-center text-gray-400">No products found</p>
            ) : (
              <div
                ref={listRef}
                onScroll={handleScroll}
                className="absolute mt-2 w-full rounded-xl border bg-white shadow-xl z-50 max-h-[400px] overflow-y-auto animate-fadeIn"
              >
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-4 p-4 rounded-md transition duration-200
                      ${index === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.imgCover}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-800">
                          {highlightText(product.title, searchValue)}
                        </p>
                        <p className="text-base font-semibold text-gray-900 mt-1">
                          {product.priceAfterDiscount}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            EGP
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                      <Star className="text-yellow-500 w-5 h-5" />
                      <span className="text-sm text-zinc-800">Rating :</span>
                      <span className="text-gray-800 text-base">
                        {product.ratingsAverage?.toFixed(1) ?? "0.0"}/5
                      </span>
                      <span className="text-blue-600 text-sm p-0">
                        ({product.ratingsQuantity ?? 0} ratings)
                      </span>
                    </div>
                  </Link>
                ))}

                {isFetchingNextPage && (
                  <p className="p-3 text-center text-xs text-gray-400">
                    Loading more...
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
