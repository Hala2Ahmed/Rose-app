import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { ChevronDown } from "lucide-react";

type Status = "default" | "error" | "disabled";

type SelectProps = React.ComponentProps<"select"> & {
  status?: Status;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, status = "default", children, ...props }, ref) => {
    const statusClasses = {
      default: `
        border-zinc-300 hover:border-zinc-400

        focus-visible:border-maroon-600
        focus-visible:ring-1
        focus-visible:ring-maroon-600

        dark:bg-zinc-700
        dark:border-zinc-600
        dark:hover:bg-zinc-700
        dark:hover:border-zinc-500
        dark:text-zinc-400

        dark:focus-visible:border-softpink-400
        dark:focus-visible:ring-1
        dark:focus-visible:ring-softpink-400
      `,

      error:
        "border-red-600 hover:border-red-600 focus:border-red-600 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400 ",
      disabled:
        " bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
    };

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl px-4 pr-10 bg-white text-sm font-sarabun border appearance-none cursor-pointer focus:outline-none",
            statusClasses[status],
            className
          )}
          disabled={status === "disabled" || props.disabled}
          {...props}
        >
          {children}
        </select>

        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
          <ChevronDown className="h-5 w-5" />
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
