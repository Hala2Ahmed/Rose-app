

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

/* =========================
   Disabled Styles
========================= */

const disabledPrimary =
  "disabled:bg-zinc-300 disabled:text-zinc-500 disabled:border-zinc-300 disabled:cursor-not-allowed " +
  "dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:disabled:border-zinc-800";

const disabledOutline =
  "disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-300 disabled:cursor-not-allowed " +
  "dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600";

/* =========================
   Button Variants
========================= */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl whitespace-nowrap text-base leading-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: `
          bg-maroon-600 text-white hover:bg-maroon-700
          dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400
          ${disabledPrimary}
        `,
        secondary: `
          bg-maroon-50 text-maroon-600 hover:bg-maroon-100
          dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600
          ${disabledPrimary}
        `,
        outline: `
          bg-white border border-maroon-600 text-maroon-600 hover:bg-maroon-50
          dark:bg-zinc-800 dark:border-softPink-300 dark:text-softPink-300 dark:hover:bg-zinc-700
          ${disabledOutline}
        `,
        subtle: `
          bg-zinc-50 border border-zinc-400 text-zinc-800 hover:bg-zinc-100
          dark:bg-zinc-800 dark:border-zinc-500 dark:text-zinc-50 dark:hover:bg-zinc-700
          ${disabledOutline}
        `,
        ghost: `
          bg-transparent text-zinc-800 hover:bg-zinc-100
          dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-700
          ${disabledOutline}
          dark:disabled:bg-zinc-700
          dark:disabled:text-zinc-600
          dark:disabled:border-zinc-800
        `,
        destructive: `
          bg-red-600 text-white hover:bg-red-700
          dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600
          ${disabledPrimary}
        `,
      },
      size: {
        default: "px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      state: {
        loading:
          "h-4 w-4 bg-zinc-300 text-zinc-500 dark:bg-zinc-600 dark:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

/* =========================
   Types
========================= */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

/* =========================
   Component
========================= */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      state,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, state, className }))}
        disabled={loading || props.disabled}
        {...props}
      >
        {children}
        {loading && <Loader2 className="animate-spin" />}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
