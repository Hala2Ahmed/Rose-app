import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 font-primary font-medium text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-zinc-800",
  {
    variants: {
      variant: {
        subtle:
          "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700",
        secondary:
          "bg-maroon-50 text-maroon-600 border-maroon-200 hover:bg-maroon-100 dark:bg-zinc-700 dark:text-softPink-300 dark:border-zinc-600 dark:hover:bg-zinc-600",
        primary:
          "bg-maroon-600 text-white border-maroon-600 hover:bg-maroon-700 dark:bg-softPink-400 dark:text-zinc-800 dark:border-softPink-400 dark:hover:bg-softPink-500",
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
