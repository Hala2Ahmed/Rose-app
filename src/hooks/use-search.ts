"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/[locale]/(site)/(homepage)/_services/products.service";

export function useSearch(open: boolean, keyword: string) {
  return useInfiniteQuery({
    queryKey: ["search-products", keyword || "all"],

    queryFn: ({ pageParam = 1 }) =>
      getProducts(pageParam, 10, {
        ...(keyword ? { keyword } : {}),
      }),

    initialPageParam: 1,

    enabled: open, // ✅ يشتغل أول ما search يفتح

    staleTime: 1000 * 60 * 5,

    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
