import React from "react";

type Props = {
  title: string;
};
export default function GreetingTitle({ title }: Props) {
  return (
    <h3
      style={{ fontFamily: "var(--font-edwardian)" }}
      className="text-maroon-700 text-5xl font-edwardian border-b-2 pb-4 mb-6">
      {title}
    </h3>
  );
}
