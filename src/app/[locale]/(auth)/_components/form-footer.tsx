import { Link } from "@/i18n/navigation";
import React from "react";
type Props = {
  text: string;
  link: string;
  linkHref: string;
};
export default function FormFooter({ text, link, linkHref }: Props) {
  return (
    <div className=" pt-5  font-medium text-sm text-center border-t-2 mt-9">
      {text}
      <Link className="text-maroon-700 font-bold" href={linkHref}>
        {link}
      </Link>
    </div>
  );
}
