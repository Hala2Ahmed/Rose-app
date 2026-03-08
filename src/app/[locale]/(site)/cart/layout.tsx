import ProductMayLike from "@/components/shared/product-may-like";
import React from "react";

export default function CartLayout({
  children,
  summary,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:flex justify-between ">
        {children}
        {summary}
      </div>

      {/* Product May Like */}
      <ProductMayLike />
    </>
  );
}
