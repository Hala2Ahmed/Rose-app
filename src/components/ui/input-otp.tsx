"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type OTPStatus = "default" | "error" | "disabled";

interface InputOTPProps
  extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  status?: OTPStatus;
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, status = "default", ...props }, ref) => {
  const statusStyles = {
    default:
      "border-zinc-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-400",
    error:
      "border-red-600 focus:border-none dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400",
    disabled:
      "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
  };

  return (
    <OTPInput
      ref={ref}
      disabled={status === "disabled"}
      containerClassName={cn(
        "flex items-center gap-2",
        status === "disabled" && "opacity-50 cursor-not-allowed",
        containerClassName
      )}
      className={cn(
        "flex h-11 w-full bg-white px-3 py-2 border rounded-xl placeholder:text-zinc-400 focus:outline-none focus:border focus:border-maroon-600 dark:focus:border-softpink-400",
        statusStyles[status],
        className
      )}
      {...props}
    />
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number; status?: OTPStatus }
>(({ index, className, status = "default", ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  const statusStyles = {
    default:
      "border-zinc-300 hover:border-zinc-400 bg-white text-zinc-800 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-500 dark:text-zinc-400",
    error:
      "border-red-600 hover:border-red-600 bg-white text-zinc-800 dark:border-red-500 dark:bg-zinc-700 dark:text-zinc-400",
    disabled:
      "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-xl text-sm shadow-sm transition-all border",
        statusStyles[status],
        isActive &&
          status !== "disabled" &&
          "z-10 ring-1 ring-maroon-600 dark:ring-softpink-400",
        status === "disabled" && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && status !== "disabled" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground dark:bg-zinc-50" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus className="text-zinc-400 dark:text-zinc-600" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
