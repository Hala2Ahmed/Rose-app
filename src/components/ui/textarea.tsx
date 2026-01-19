import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: Status;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, status = "default", ...props }, ref) => {
    const statusStyles = {
      default: `
  border-zinc-300 hover:border-zinc-400

  focus-visible:border-maroon-600
  focus-visible:ring-1
  focus-visible:ring-maroon-600

  dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-400
  dark:hover:border-zinc-500

  dark:focus-visible:border-softPink-400
  dark:focus-visible:ring-1
  dark:focus-visible:ring-softPink-400
`,

      error:
        "border-red-600 hover:border-red-600 focus:border-red-600 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400 ",
      disabled:
        " bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600",
    };

    return (
      <textarea
        ref={ref}
        disabled={status === "disabled"}
        className={cn(
          "flex min-h-[150px] w-full rounded-xl p-4 bg-white text-sm font-sarabun border placeholder:text-zinc-400 focus:outline-none focus:border",
          statusStyles[status],
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
