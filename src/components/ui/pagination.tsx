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

/* =========================
   Root container
========================= */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/* =========================
   UL container
========================= */
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

/* =========================
   LI container
========================= */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/* =========================
   Pagination Link (button)
========================= */
type PaginationLinkProps = {
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl border text-sm transition-colors ",
        isActive
          ? "bg-maroon-600 text-white border-maroon-600 dark:bg-softPink-400 dark:text-zinc-700 dark:border-softPink-400"
          : "bg-white text-zinc-800 border-zinc-100 dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600",
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

/* =========================
   Previous button
========================= */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={className}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 text-zinc-800 dark:text-zinc-50" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/* =========================
   Next button
========================= */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" className={className} {...props}>
    <ChevronRight className="h-4 w-4 text-zinc-800 dark:text-zinc-50" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/* =========================
   First button
========================= */
const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={className}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4 text-zinc-800 dark:text-zinc-50" />
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

/* =========================
   Last button
========================= */
const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to last page" className={className} {...props}>
    <ChevronsRight className="h-4 w-4 text-zinc-800 dark:text-zinc-50" />
  </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

/* =========================
   Ellipsis
========================= */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 text-zinc-800 dark:text-zinc-400" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

/* =========================
   Exports
========================= */
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
};
