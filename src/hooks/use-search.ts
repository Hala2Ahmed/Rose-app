"use client";

import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { getProducts } from "@/lib/services/search.api";
import type {
  SearchProduct,
  SearchProductsResponse,
} from "@/lib/types/search.types";

const SEARCH_PAGE_SIZE = 8;
const MIN_KEYWORD_LENGTH = 2;
const STALE_TIME_MS = 2 * 60 * 1000; // 2 minutes

export interface UseSearchParams {
  /** When true, the query can run (e.g. dropdown is open) */
  open: boolean;
  /** Search keyword; debounced internally */
  keyword: string;
}

export interface UseSearchResult extends Omit<
  UseInfiniteQueryResult<SearchProductsResponse, Error>,
  "data"
> {
  /** All products from all loaded pages, flattened */
  products: SearchProduct[];
  /** Debounced keyword used for the current request */
  debouncedKeyword: string;
  /** True while the input keyword is not yet equal to debounced (typing) */
  isSearching: boolean;
  /** True when keyword has at least MIN_KEYWORD_LENGTH chars (or empty for suggestions) */
  hasEnoughChars: boolean;
  /** Raw infinite query data (pages) */
  data: UseInfiniteQueryResult<SearchProductsResponse, Error>["data"];
}

export function useSearch({ open, keyword }: UseSearchParams): UseSearchResult {
  const debouncedKeyword = useDebounce(keyword.trim(), 300);

  const trimmed = keyword.trim();
  const hasEnoughChars =
    trimmed.length === 0 || trimmed.length >= MIN_KEYWORD_LENGTH;
  /** Only send keyword to API when >= 2 chars; otherwise fetch default suggestions */
  const effectiveKeyword =
    debouncedKeyword.length >= MIN_KEYWORD_LENGTH
      ? debouncedKeyword
      : undefined;

  const query = useInfiniteQuery<SearchProductsResponse, Error>({
    queryKey: ["search", "infinite", open, debouncedKeyword],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getProducts(pageParam, SEARCH_PAGE_SIZE, effectiveKeyword),
    initialPageParam: 1,
    getNextPageParam: (lastPage: SearchProductsResponse) =>
      lastPage.nextPage ?? undefined,
    /** Fetch when open and either empty (suggestions) or 2+ chars (search); skip 1 char */
    enabled: open && hasEnoughChars,
    staleTime: STALE_TIME_MS,
    placeholderData: (
      previousData: InfiniteData<SearchProductsResponse> | undefined,
    ) => previousData,
  });

  const products: SearchProduct[] =
    query.data?.pages.flatMap(
      (page: SearchProductsResponse) => page.products,
    ) ?? [];

  return {
    ...query,
    data: query.data,
    products,
    debouncedKeyword,
    isSearching: trimmed !== debouncedKeyword,
    hasEnoughChars,
  };
}
