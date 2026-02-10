import React from "react";
import ProductDetails from "./_components/product-details";

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetails id={params.id} />;
}
