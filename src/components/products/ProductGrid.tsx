"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton";
import { AppPagination } from "@/components/ui/pagination";
import { useProducts } from "@/hooks/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import BestSellingCard from "@/app/[locale]/(site)/(homepage)/_components/best-selling/best-selling-card";

interface Props {
  initialPage: number;
  initialData: any;
}

export default function ProductGrid({ initialPage, initialData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page") ?? initialPage);
  const filters = Object.fromEntries(
    [...searchParams.entries()].filter(([k]) => k !== "page"),
  );

  const { data, isLoading, isFetching, error } = useProducts({
    page,
    filters,
    initialData,
  });

  const products = data?.products ?? [];
  const totalPages = data?.metadata?.totalPages ?? 1;

  const { toggleWishlist, isInWishlist, togglingId, mergeGuestWishlist } =
    useWishlist(products);

  // Sync guest wishlist on login
  useEffect(() => {
    mergeGuestWishlist();
  }, [mergeGuestWishlist]);

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  if (error)
    return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <BestSellingCard
                key={product._id}
                data={product}
                isInWishlist={isInWishlist(product._id)}
                togglingId={togglingId}
                onWishlistToggle={() => toggleWishlist(product._id)}
              />
            ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <AppPagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {isFetching && !isLoading && (
        <div className="grid grid-cols-3 gap-6 opacity-60">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
