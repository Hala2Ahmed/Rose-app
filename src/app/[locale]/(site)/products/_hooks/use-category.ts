"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { allCategoriesService } from "@/lib/services/category.service";

export function useCategories(limit: number = 6) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories", limit],
    queryFn: ({ pageParam }) =>
      allCategoriesService({
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  };
}