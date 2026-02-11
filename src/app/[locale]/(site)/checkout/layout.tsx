import React from "react";

export default function CartLayout({
  children,
  summary,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <div className="flex gap-12">
      {children}
      {summary}
    </div>
  );
}
