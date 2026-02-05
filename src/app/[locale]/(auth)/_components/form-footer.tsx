import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import React from "react";
type Props = {
  text: string;
  link: string;
  linkHref: string;
  className?: string;
};

export default function FormFooter({ text, link, linkHref, className }: Props) {
  return (
    <div
      className={cn(
        "pt-5 font-medium text-sm text-center border-t-2 mt-9 first-letter:capitalize",
        className,
      )}>
      {text}
      <Link className="text-maroon-700 font-bold ms-1" href={linkHref}>
        {link}
      </Link>
    </div>
  );
}
