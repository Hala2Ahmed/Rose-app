"use client";

import { allOccasionsService } from "@/app/[locale]/(site)/(homepage)/_services/all-occasion.service";
import { DEFAULT_OCCASIONS_LIMIT } from "@/lib/constants/occasions-filter.constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useOccasions(limit: number = DEFAULT_OCCASIONS_LIMIT) {
  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ["occasions", limit],
      queryFn: ({ pageParam }) =>
        allOccasionsService({ page: pageParam, limit }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.metadata;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }
        return undefined;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  return {
    occasions: data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
