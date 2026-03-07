"use client";

import { useMemo } from "react";

type UsePaginationProps = {
  page: number;
  totalPages: number;
  siblingCount?: number;
};
export type PaginationItem = number | "dots";
const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);
export function usePagination({
  page,
  totalPages,
  siblingCount = 2,
}: UsePaginationProps): PaginationItem[] {
  return useMemo(() => {
    if (totalPages <= 1) return [];

    if (totalPages <= 5) {
      return range(1, totalPages);
    }
    const pages: PaginationItem[] = [];
    const left = Math.max(page - siblingCount, 2);
    const right = Math.min(page + siblingCount, totalPages - 1);
    pages.push(1);
    if (left > 2) pages.push("dots");
    pages.push(...range(left, right));
    if (right < totalPages - 1) pages.push("dots");
    pages.push(totalPages);
    return pages;
  }, [page, totalPages, siblingCount]);
}
