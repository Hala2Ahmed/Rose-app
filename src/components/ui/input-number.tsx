import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

type NumberInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  status?: Status;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, status = "default", onChange, value, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLInputElement>) ?? inputRef;

    const isDisabled = status === "disabled" || props.disabled;

    const statusClasses = {
      default: `border-zinc-300 hover:border-zinc-400
        focus-within:border-maroon-600
        focus-within:ring-1 focus-within:ring-maroon-600
        dark:bg-zinc-700 dark:border-zinc-600
        dark:hover:border-zinc-500
        dark:focus-within:border-softPink-400
        dark:focus-within:ring-softPink-400`,
      error: "border-red-600 dark:border-red-500 dark:bg-zinc-700",
      disabled:
        "bg-zinc-100 border-none cursor-not-allowed dark:bg-zinc-800 dark:border-zinc-700",
    };

    const handleStep = (direction: "up" | "down") => {
      if (isDisabled) return;
      const current = Number(value || 0);
      const step = Number(props.step || 1);
      const newValue = direction === "up" ? current + step : current - step;

      const syntheticEvent = {
        target: { value: String(newValue) },
        currentTarget: { value: String(newValue) },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    return (
      <div
        className={cn(
          "flex h-11 w-full rounded-xl bg-white border overflow-hidden",
          statusClasses[status],
          className,
          isDisabled && "bg-zinc-100",
        )}
      >
        <input
          ref={combinedRef}
          type="number"
          value={value ?? ""}
          onChange={onChange}
          className="flex-1 px-4 text-sm font-sarabun disabled:cursor-not-allowed focus:outline-none  bg-transparent placeholder:text-zinc-400
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={status === "disabled" || props.disabled}
          {...props}
        />

        <div className="flex flex-col justify-center gap-[0.1rem] disabled:cursor-not-allowed">
          <button
            type="button"
            className="pe-3 disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={() => handleStep("up")}
          >
            <svg
              className="w-2 h-2 text-zinc-400"
              viewBox="0 0 10 6"
              fill="currentColor"
            >
              <path d="M5 0L10 6H0L5 0Z" />
            </svg>
          </button>
          <div />
          <button
            type="button"
            className="pe-3 disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={() => handleStep("down")}
          >
            <svg
              className="w-2 h-2 text-zinc-400"
              viewBox="0 0 10 6"
              fill="currentColor"
            >
              <path d="M5 6L0 0H10L5 6Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
