"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, Toast } from "sonner";
import { CircleAlert, Check, X } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        default: (
          <CircleAlert className="h-4 w-4 text-zinc-800 dark:bg-zinc-300 " />
        ),
        success: (
          <Check className="h-4 w-4 text-emerald-700 dark:bg-emerald-300" />
        ),
        error: <X className="h-4 w-4 text-red-700 dark:bg-red-300" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "relative flex items-center w-[447px] h-[53px] px-4 py-4 pr-8 rounded-xl font-primary",
          default:
            "bg-zinc-100 border-zinc-400 text-zinc-800 dark:bg-zinc-300 dark:border-zinc-600 ",
          success:
            "bg-emerald-50 border border-emerald-700 text-zinc-800 dark:bg-emerald-300 dark:border-emerald-600 ",
          error:
            "bg-red-50 border border-red-700 text-zinc-800 dark:bg-red-300 dark:border-red-600 ",
          title: "text-sm font-semibold leading-[150%]",
          description: "text-sm font-normal leading-[150%]",
          closeButton:
            "absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-4 text-zinc-400 hover:text-zinc-600  dark:hover:text-zinc-300",
        },
      }}
      toastOptionsDefaults={{
        showCloseButton: false, 
      }}
      {...props}
    >
      {(toast: Toast) => (
        <button
          onClick={() => toast.close()}
          className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-4 text-zinc-400 hover:text-zinc-600  dark:hover:text-zinc-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Sonner>
  );
};

export { Toaster };
