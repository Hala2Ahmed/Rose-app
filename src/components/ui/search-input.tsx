import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { LucideSearch } from "lucide-react";

type Status = "default" | "error" | "disabled";

type SearchInputProps = React.ComponentProps<"input"> & {
  status?: Status;
};

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, status = "default", type = "text", ...props }, ref) => {
    const statusClasses: Record<Status, string> = {
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

        dark:focus-visible:border-softPink-400
        dark:focus-visible:ring-1
        dark:focus-visible:ring-softPink-400
      `,
      error:
        "border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400",
      disabled:
        "bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
    };

    return (
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
          <LucideSearch className="h-4 w-4" />
        </span>

        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border bg-white px-4 pl-10 text-sm font-sarabun placeholder:text-zinc-400 focus:outline-none",
            statusClasses[status],
            className
          )}
          disabled={status === "disabled" || props.disabled}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
