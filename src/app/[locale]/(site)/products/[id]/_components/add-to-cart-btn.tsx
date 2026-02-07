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
  const addToCart = useAddToCart();
  const isLoading = addToCart.isPending;

  return (
    <Button
      className="w-full"
      onClick={() => addToCart.mutate({ product, quantity: 1 })}
      disabled={isLoading || product.quantity <= 0}
    >
      <ShoppingCart className="w-6 h-6 mr-2.5" />
      {product.quantity <= 0
        ? "Out of Stock"
        : isLoading
          ? "Adding..."
          : "Add to Cart"}
    </Button>
  );
}
