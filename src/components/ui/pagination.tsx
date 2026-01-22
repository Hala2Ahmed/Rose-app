
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

  // ==================== Types
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

  // ====================   Helpers
const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

   // ====================  Containers
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
  <ul
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

   // ====================  Pagination Link
type PaginationLinkProps = {
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl border text-sm transition-colors",
        isActive
          ? "bg-maroon-600 text-white border-maroon-600"
          : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-100",
        className,
      )}
      {...props}
    />
  ),
);
PaginationLink.displayName = "PaginationLink";
 // ====================  Buttons 
const PaginationFirst = (
  props: React.ComponentProps<typeof PaginationLink>,
) => (
  <PaginationLink aria-label="Go to first page" {...props}>
    <ChevronsLeft className="h-4 w-4" />
  </PaginationLink>
);

const PaginationPrevious = (
  props: React.ComponentProps<typeof PaginationLink>,
) => (
  <PaginationLink aria-label="Go to previous page" {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationLast = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to last page" {...props}>
    <ChevronsRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = () => (
  <span className="flex h-9 w-9 items-center justify-center">
    <MoreHorizontal className="h-4 w-4 text-zinc-500" />
  </span>
);
 // ====================  AppPagination
export function AppPagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const siblingCount = 2;
  const pages: (number | "dots")[] = [];

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, totalPages - 1);

  // First page
  pages.push(1);

  //  Dots before
  if (left > 2) {
    pages.push("dots");
  }

  //  Middle pages
  pages.push(...range(left, right));

  //  Dots after
  if (right < totalPages - 1) {
    pages.push("dots");
  }

  //  Last page
  pages.push(totalPages);

  const handleClick = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <PaginationWrapper>
      <PaginationContent>
        {/* First */}
        <PaginationItem>
          <PaginationFirst
            disabled={page === 1}
            onClick={() => handleClick(1)}
          />
        </PaginationItem>

        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => handleClick(page - 1)}
          />
        </PaginationItem>

        {/* Pages */}
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

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            disabled={page === totalPages}
            onClick={() => handleClick(page + 1)}
          />
        </PaginationItem>

        {/* Last */}
        <PaginationItem>
          <PaginationLast
            disabled={page === totalPages}
            onClick={() => handleClick(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}
