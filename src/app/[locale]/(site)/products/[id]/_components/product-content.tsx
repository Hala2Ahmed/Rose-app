import React from "react";
import { getProductDetails } from "../_actions/product-content.action";
import ProductInfo from "./product-info";

export default async function ProductContent({ id }: { id: string }) {
  let product;
  try {
    product = await getProductDetails(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return <ProductInfo product={product} />;
}
