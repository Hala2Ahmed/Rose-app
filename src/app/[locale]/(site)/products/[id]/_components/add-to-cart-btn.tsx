"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ProductDetails } from "@/lib/types/product-details";
import { useAddToCart } from "@/hooks/use-cart";

export default function AddToCartButton({
  product,
}: {
  product: ProductDetails;
}) {
  //Mutation
  const { mutate, isPending } = useAddToCart();

  return (
    <Button
      className="w-full"
      onClick={() => mutate({ product, quantity: 1 })}
      disabled={isPending || product.quantity <= 0}
    >
      <ShoppingCart className="w-6 h-6 mr-2.5" />
      {product.quantity <= 0
        ? "Out of Stock"
        : isPending
          ? "Adding..."
          : "Add to Cart"}
    </Button>
  );
}
