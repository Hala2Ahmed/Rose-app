"use client";

import { Button } from "@/components/ui/button";
import { HeartMinus, HeartPlus, ShoppingCart } from "lucide-react";
import { ProductDetails } from "@/lib/types/product-details";
import { useAddToCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

export default function AddToCartButton({
  product,
}: {
  product: ProductDetails;
}) {
  //Mutation
  const { mutate, isPending } = useAddToCart();
  const { toggleWishlist, isInWishlist } = useWishlist([{ _id: product._id }]);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => toggleWishlist(product._id)}
        className="bg-zinc-100 text-zinc-800"
      >
        {isInWishlist(product._id) ? (
          <HeartMinus className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <HeartPlus className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </Button>

      <Button
        className="w-full"
        onClick={() => mutate({ product, quantity: 1 })}
        disabled={isPending || product.quantity <= 0}
      >
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2.5" />
        {product.quantity <= 0
          ? "Out of Stock"
          : isPending
            ? "Adding..."
            : "Add to Cart"}
      </Button>
    </>
  );
}
