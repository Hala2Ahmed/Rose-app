"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton";
import { AppPagination } from "@/components/ui/pagination";
import { useProducts } from "@/hooks/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import BestSellingCard from "@/app/[locale]/(site)/(homepage)/_components/best-selling/best-selling-card";
import { BestSellingProduct } from "@/lib/types/best-selling.types";

interface ProductsResponse {
  products: BestSellingProduct[];
  metadata: {
    totalPages: number;
  };
}

interface Props {
  initialPage: number;
  initialData: ProductsResponse | null;
}

export default function ProductGrid({ initialPage, initialData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? initialPage);

  // Filters excluding "page"
  const filters = useMemo(() => {
    return Object.fromEntries(
      [...searchParams.entries()].filter(([key]) => key !== "page"),
    );
  }, [searchParams]);

  const { data, isLoading, isFetching, error } = useProducts({
    page,
    filters,
    initialData,
  });

  const products: BestSellingProduct[] = data?.products ?? [];
  const totalPages = data?.metadata?.totalPages ?? 1;

  const {
    toggleWishlist,
    isInWishlist,
    mergeGuestWishlist: mergeGuestWishlistRaw,
  } = useWishlist(products);

  const mergeGuestWishlist = useCallback(() => {
    mergeGuestWishlistRaw();
  }, [mergeGuestWishlistRaw]);

  useEffect(() => {
    mergeGuestWishlist();
  }, [mergeGuestWishlist]);

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const showSkeleton = isLoading || isFetching;

  /* ---------------- Error UI ---------------- */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        <p className="text-lg font-medium text-red-600">
          Oops! Something went wrong while loading products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showSkeleton
          ? Array.from({ length: 24 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <BestSellingCard
                key={product._id}
                data={product}
                isInWishlist={isInWishlist(product._id)}
                onWishlistToggle={() => toggleWishlist(product._id)}
              />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <AppPagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
