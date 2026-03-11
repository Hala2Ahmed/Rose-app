"use client";

import * as React from "react";
import { Upload, Image } from "lucide-react";  
import { cn } from "@/lib/utils/tailwind-merge";

type Status = "default" | "error" | "disabled";

interface FileInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "type"> {
  status?: Status;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, status = "default", id,onChange,value, ...props }, ref) => {
    const inputId = id || React.useId();
    const [fileName, setFileName] = React.useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if (props.multiple) {
          setFileName(
            files.length === 1 ? files[0].name : `${files.length} files selected`
          );
        } else {
          setFileName(files[0].name);
        }
      } else {
        setFileName("");
      }
      onChange?.(e);
    };

    const statusStyles = {
      default:
        "border-zinc-300 hover:border-zinc-400 focus-within:border-maroon-600 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-500 dark:focus-within:bg-zinc-700 dark:focus-within:border-softpink-400",
      error:
        "border-red-600 hover:border-red-600 focus-within:border-red-600 dark:border-red-500 dark:bg-zinc-700",
      disabled:
        "bg-zinc-100 text-zinc-400 cursor-not-allowed border-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-700",
    };

    return (
      <div
        className={cn(
          "flex items-center w-full rounded-xl border bg-white transition-colors text-maroon-500 dark:text-zinc-400",
          statusStyles[status],
          status === "disabled" && "opacity-50",
          className
        )}
      >
        <input
          type="file"
          id={inputId}
          ref={ref}
          disabled={status === "disabled"}
          className="sr-only"
          {...props}
          onChange={handleFileChange}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "flex flex-1 items-center justify-between cursor-pointer px-4 py-2.5 text-sm font-sarabun",
            status === "disabled" && "cursor-not-allowed pointer-events-none"
          )}
        >
          <span
            className={cn(
              "flex items-center gap-2 text-sm font-sarabun truncate",
              fileName
                ? "text-blue-600 dark:text-blue-600"
                : status === "default"
                ? "text-maroon-500 hover:text-maroon-600 dark:text-zinc-400"
                : status === "error"
                ? "text-red-600 dark:text-zinc-400"
                : "text-zinc-400 dark:text-zinc-400"
            )}
          >
            {fileName && <Image className="h-4 w-4 text-blue-600" />}
            {fileName || "No file selected"}
          </span>

          <span
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors flex-shrink-0",
              status === "default"
                ? "text-maroon-500 hover:text-maroon-600 dark:text-zinc-400"
                : status === "error"
                ? "text-red-600 dark:text-zinc-400"
                : "text-zinc-400 dark:text-zinc-700 cursor-not-allowed"
            )}
          >
            <Upload className="h-4 w-4" />
            Upload file
          </span>
        </label>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
