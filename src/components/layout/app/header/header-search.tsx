"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "./search-bar";
import { useSearch } from "@/hooks/use-search";
import SearchDropdownSkeleton from "@/components/skeletons/search-item.skeleton";

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
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearch(open, searchValue);

  const products: Product[] =
    data?.pages.flatMap((page) => page.products) || [];

  // ================= Scroll (Infinite) =================
  const handleScroll = () => {
    if (!listRef.current || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };

  // ================= Highlight =================
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-maroon-500 font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // ================= Click Outside =================
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

  // ================= Keyboard Navigation =================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = Math.min(prev + 1, products.length - 1);
        listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = Math.max(prev - 1, 0);
        listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < products.length) {
        const product = products[activeIndex];
        router.push(`/products/${product._id}`);
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // ================= Render =================
  return (
    <header className="relative w-full">
      <div ref={wrapperRef} className="dark:text-white dark:bg-gray-900">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {open && (
          <>
            {isFetching && products.length === 0 ? (
              <SearchDropdownSkeleton count={5} />
            ) : products.length === 0 ? (
              <div className="absolute mt-2 w-full rounded-xl border bg-white dark:bg-zinc-800 shadow-xl z-50 p-4 text-center text-gray-400 dark:text-gray-300">
                No products found
              </div>
            ) : (

              <div
                ref={listRef}
                onScroll={handleScroll}
                className="absolute w-full rounded-xl border bg-white dark:bg-zinc-800 shadow-xl z-50 max-h-[400px] overflow-y-auto animate-fadeIn"
              >
                <div className="text-maroon-700 font-semibold text-xg px-4">Products you may like: </div>
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      router.push(`/products/${product._id}`);
                      setOpen(false);
                      setActiveIndex(-1);
                    }}
                    className={`flex items-center justify-between gap-4 p-4 cursor-pointer transition duration-200 ${
                      index === activeIndex
                        ? "bg-gray-100 dark:bg-zinc-800"
                        : "hover:bg-gray-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                        <Image
                          src={product.imgCover}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {highlightText(product.title, searchValue)}
                        </p>

                        <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
                          {product.priceAfterDiscount}
                          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                            EGP
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                      <Star className="text-yellow-500 w-5 h-5" />
                      <span className="text-sm text-zinc-800 dark:text-gray-200">Rating :</span>
                      <span className="text-gray-800 dark:text-gray-200 text-base">
                        {product.ratingsAverage?.toFixed(1) ?? "0.0"}/5
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 text-sm p-0">
                        ({product.ratingsQuantity ?? 0} ratings)
                      </span>
                    </div>
                  </div>
                ))}

                {/* Products You May Like Section */}
                <div className="mt-2 border-t pt-2 px-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Products You May Like
                  </h3>
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product._id + "-maylike"}
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 rounded transition"
                    >
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                        <Image
                          src={product.imgCover}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {product.title}
                      </p>
                    </div>
                  ))}
                </div>

                {isFetchingNextPage && (
                  <p className="p-3 text-center text-xs text-gray-400 dark:text-gray-300">
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
