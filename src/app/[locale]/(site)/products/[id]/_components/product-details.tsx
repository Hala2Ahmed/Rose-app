"use client";
import React, { useState } from "react";
import useProductDetails from "../_hooks/use-product-details";
import ProductGallery from "./product-gallery";
import { useFormatter } from "next-intl";
import { HeartPlus, Package, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/cart.provider";
import ProductDetailsSkeleton from "@/components/skeletons/product-details/product-details.skeleton";

export default function ProductDetails({ id }: { id: string }) {
  //Translation
  const format = useFormatter();

  //State
  const [loading, setLoading] = useState(false);

  //Context
  const { addToCart } = useCart();

  //Hook
  const { isLoading, product, error } = useProductDetails(id);

  //Functions to handle add to cart
  const handleAdd = async () => {
    try {
      setLoading(true);
      await addToCart(product, 1);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (isLoading) return <ProductDetailsSkeleton />;

  // Error state
  if (error)
    return (
      <p className="flex justify-center mx-auto text-red-600 p-10">
        Error loading product details.
      </p>
    );

  return (
    <div className="flex gap-16 my-12">
      {/* Product images */}
      <div>
        {product?.images && product?.imgCover && (
          <ProductGallery
            images={product.images}
            imgCover={product.imgCover}
            _id={product._id}
          />
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col max-h-[523px]">
        <h1 className="text-3xl font-semibold text-zinc-800 pb-2">
          {product?.title}
        </h1>

        <div className="flex gap-2 border-b border-zinc-100 mb-4 py-4">
          {product?.priceAfterDiscount ? (
            <>
              <span className="text-3xl font-bold line-through text-zinc-300">
                {product?.price}
              </span>
              <span className="text-3xl font-semibold text-zinc-800">
                {format.number(product?.priceAfterDiscount, "currency")}
              </span>
            </>
          ) : (
            <span className="text-3xl font-semibold text-zinc-800">
              {format.number(product!.price, "currency")}
            </span>
          )}
          <Badge
            variant={product!.quantity > 0 ? "subtle" : "secondary"}
            className="flex items-center gap-1 rounded-full ml-3"
          >
            <Package className="w-5 h-5" />
            {product!.quantity > 0
              ? `${product?.quantity} left in stock`
              : "Out of stock"}
          </Badge>
        </div>

        <div className="flex gap-2 border-b border-zinc-100 mb-4 py-4">
          <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          {product!.rateCount > 0 ? (
            <span className="text-sm text-zinc-700">
              Rating:{" "}
              <span className="font-medium">
                {product?.rateAvg.toFixed(1)}/5
              </span>{" "}
              <span className="font-medium text-blue-600">
                ({product?.rateCount} ratings )
              </span>
            </span>
          ) : (
            <span className="text-sm text-zinc-400">No ratings yet</span>
          )}
        </div>

        <p className="text-zinc-600 max-w-[605px] overflow-y-auto mb-4">
          {product?.description}
        </p>

        <div className="flex gap-2.5 mt-auto">
          <Button variant="ghost" className="bg-zinc-100 text-zinc-800">
            <HeartPlus className="w-6 h-6" />
          </Button>
          
          <Button
            className="w-full"
            onClick={handleAdd}
            disabled={loading || product?.quantity === -1}
          >
            <ShoppingCart className="w-6 h-6 mr-2.5" />
            {product?.quantity === -1
              ? "Out of Stock"
              : loading
                ? "Adding..."
                : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
