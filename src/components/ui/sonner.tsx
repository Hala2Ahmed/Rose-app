"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { Check, X, CircleAlert } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const sonnerProps = {
    theme: theme as ToasterProps["theme"],
    className: "toaster group",
    icons: {
      default: (
        <CircleAlert className="me-2 h-4 w-4 min-w-4 min-h-4 text-zinc-800 dark:text-zinc-800" />
      ),
      success: (
        <Check className=" me-2 h-4 w-4 min-w-4 min-h-4 !text-emerald-600 dark:!text-emerald-400" />
      ),
      error: (
        <X className=" me-2 h-4 w-4 min-w-4 min-h-4 !text-red-700 dark:!text-red-400" />
      ),
      close: (
        <X className=" me-2 h-4 w-4 min-w-4 min-h-4 !text-zinc-400 dark:!text-zinc-800" />
      ),
    },
    toastOptions: {
      unstyled: true,
      closeButton: true,
      classNames: {
        toast:
          "relative flex items-center  w-full max-w-md h-14 px-4 py-4 pr-8 rounded-xl font-primary border",

        default:
          "bg-zinc-100 border-zinc-400 text-zinc-800 dark:bg-zinc-300 dark:text-zinc-800",

        success:
          "!bg-emerald-50 border !border-emerald-700 !text-zinc-800 dark:!bg-emerald-300 dark:text-zinc-800",

        error:
          "!bg-red-50 border !border-red-700 !text-zinc-800 dark:!bg-red-300 dark:!border-zinc-600 dark:text-zinc-800",

        title: "text-sm font-semibold leading-[150%]",
        description: "text-sm font-normal leading-[150%]",

        closeButton:
          "absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-4 !bg-transparent border-none text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 shadow-none",
      },
    },
    ...props,
  } as React.ComponentProps<typeof Sonner>;

  return <Sonner {...sonnerProps} />;
};

export { Toaster };
