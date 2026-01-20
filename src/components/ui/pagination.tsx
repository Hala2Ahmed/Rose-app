"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

  //  Containers
const PaginationWrapper = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

  //  Buttons
const PaginationLink = ({
  isActive,
  className,
  ...props
}: {
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-xl border text-sm",
      isActive
        ? "bg-maroon-600 text-white border-maroon-600"
        : "bg-white text-zinc-800 border-zinc-200",
      className
    )}
    {...props}
  />
);

const PaginationEllipsis = () => (
  <span className="flex h-9 w-9 items-center justify-center">
    <MoreHorizontal className="h-4 w-4" />
  </span>
);

  //  AppPagination Logic
export function AppPagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const siblingCount = 2;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const pages: (number | "dots")[] = [];

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, totalPages - 1);
  pages.push(1);

  if (left > 2) {
    pages.push("dots");
  }

  pages.push(...range(left, right));

  if (right < totalPages - 1) {
    pages.push("dots");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  const handleClick = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(1)}
            disabled={page === 1}
          >
            <ChevronsLeft size={16} />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
          </PaginationLink>
        </PaginationItem>

        {pages.map((item, idx) => (
          <PaginationItem key={idx}>
            {item === "dots" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={item === page}
                onClick={() => handleClick(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight size={16} />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(totalPages)}
            disabled={page === totalPages}
          >
            <ChevronsRight size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}
