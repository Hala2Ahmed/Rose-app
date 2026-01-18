"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: Status;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, status = "default", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const statusStyles: Record<Status, string> = {
      default: `
        border-zinc-300 hover:border-zinc-400

        focus-visible:border-maroon-600
        focus-visible:ring-1
        focus-visible:ring-maroon-600

        dark:bg-zinc-700
        dark:border-zinc-600
        dark:hover:border-zinc-500
        dark:text-zinc-400

        dark:focus-visible:border-softPink-400
        dark:focus-visible:ring-1
        dark:focus-visible:ring-softPink-400
      `,
     error: "border-red-600 hover:border-red-600 focus:border-red-600 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400",
      disabled: "bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600",
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          disabled={status === "disabled"}
          className={cn(
            "flex h-11 w-full rounded-xl border bg-white px-4 pr-10 text-sm font-sarabun placeholder:text-zinc-400 focus:outline-none",
            statusStyles[status],
            className
          )}
          {...props}
        />

        {status !== "disabled" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-zinc-400 hover:text-zinc-600
              dark:text-zinc-500 dark:hover:text-zinc-300
              transition-colors
            "
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
