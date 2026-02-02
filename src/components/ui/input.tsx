import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

type InputProps = React.ComponentProps<"input"> & {
  status?: Status;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, status = "default", type = "text", ...props }, ref) => {
    const statusClasses = {
      default: `
  border-zinc-300 hover:border-zinc-400
  focus-visible:border-maroon-600
  focus-visible:ring-1 focus-visible:ring-maroon-600

  dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-400
  dark:hover:border-zinc-500

  dark:focus-visible:border-softPink-400
  dark:focus-visible:ring-1
  dark:focus-visible:ring-softPink-400
`,

      error:
        "border-red-600 hover:border-red-600 focus:border-red-600 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400",
      disabled:
        "bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
    };

    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl px-4 bg-white text-sm font-sarabun border placeholder:text-zinc-400 focus:outline-none ",
          statusClasses[status],
          className
        )}
        disabled={status === "disabled" || props.disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
