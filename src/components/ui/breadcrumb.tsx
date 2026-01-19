import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

/* ================= Breadcrumb ================= */

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
    status?: Status;
  }
>(({ status = "default", className, ...props }, ref) => {
  const statusClasses: Record<Status, string> = {
    default:
      "text-zinc-600 dark:text-zinc-400",
    error: "text-red-600 dark:text-red-400",
    disabled:
      "text-zinc-400 pointer-events-none dark:text-zinc-600",
  };

  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(statusClasses[status], className)}
      {...props}
    />
  );
});
Breadcrumb.displayName = "Breadcrumb";

/* ================= Breadcrumb List ================= */

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

/* ================= Breadcrumb Item ================= */

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

/* ================= Breadcrumb Link ================= */

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
    status?: Status;
  }
>(({ asChild, status = "default", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  const statusClasses: Record<Status, string> = {
    default:
      "text-zinc-600 hover:text-maroon-600 dark:text-zinc-400 dark:hover:text-softPink-400",
    error:
      "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
    disabled:
      "text-zinc-400 pointer-events-none dark:text-zinc-600",
  };

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors", statusClasses[status], className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

/* ================= Breadcrumb Page ================= */

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & { status?: Status }
>(({ status = "default", className, ...props }, ref) => {
  const statusClasses: Record<Status, string> = {
    default:
      "text-maroon-600 font-medium dark:text-softPink-400",
    error:
      "text-red-600 font-medium dark:text-red-400",
    disabled:
      "text-zinc-400 dark:text-zinc-600",
  };

  return (
    <span
      ref={ref}
      role="link"
      aria-current="page"
      className={cn(statusClasses[status], className)}
      {...props}
    />
  );
});
BreadcrumbPage.displayName = "BreadcrumbPage";

/* ================= Separator ================= */

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5 text-zinc-400 dark:text-zinc-600", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* ================= Ellipsis ================= */

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
