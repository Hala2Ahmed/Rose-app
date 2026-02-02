"use client";

import { CircleX } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className={
        "relative border border-maroon-600 bg-maroon-50 py-2.5 mt-9 text-center text-maroon-600"
      }
    >
      <div className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
        <CircleX size={18} className="rounded-full bg-white text-maroon-600" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
