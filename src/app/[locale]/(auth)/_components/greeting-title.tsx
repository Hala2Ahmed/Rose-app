import React from "react";

import { cn } from "@/lib/utils/tailwind-merge";

type Props = {
  title: string;
  className?: string;
};

export default function GreetingTitle({ title, className }: Props) {
  return (
    <h3
      className={cn(
        "text-maroon-700 text-5xl font-edwardian border-b-2 pb-4 mb-6 first-letter:capitalize",
        className,
      )}>
      {title}
    </h3>
  );
}
