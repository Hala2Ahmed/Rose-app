"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/cart.provider";
import { ProductDetails } from "@/lib/types/product-details";

type AddToCartButtonProps = {
  product: ProductDetails;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  //State
  const [loading, setLoading] = useState(false);

  //Context
  const { addToCart } = useCart();

  //Functions to handle add to cart
  const handleAdd = async () => {
    try {
      setLoading(true);
      await addToCart(product, 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handleAdd}
      disabled={loading || product?.quantity <= 0}
    >
      <ShoppingCart className="w-6 h-6 mr-2.5" />
      {product?.quantity <= 0
        ? "Out of Stock"
        : loading
          ? "Adding..."
          : "Add to Cart"}
    </Button>
  );
}
