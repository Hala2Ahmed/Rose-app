"use client";

import Image from "next/image";
import DeleteProduct from "./delete-product-btn";
import CartHeader from "./cart-header";
import EmptyCart from "./empty-cart";
import CartQuantityControl from "./update-cart";
import CartProductDetails from "./cart-product-details";
import { useCartQuery } from "@/hooks/use-cart";
import CartSkeleton from "@/components/skeletons/cart.skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CartContent() {
  //Hooks
  const { data: cart, isPending, isError, error, refetch } = useCartQuery();

  if (isPending) return <CartSkeleton />;

  if (isError) {
    return (
      <div className="max-w-[782px] mb-12">
        <div className="border border-red-200 bg-red-50 p-8 rounded-xl text-center">
          <AlertCircle className="size-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 mb-4">
            {error ? error.message : "Something went wrong"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  if (!cart || cart.cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="w-full mb-12">
      {/*Cart Header */}
      <CartHeader
        cartLength={cart.cartItems.length}
        disabled={!cart || cart.cartItems.length === 0}
      />

      {/* Cart Items */}
      <div className="border border-zinc-200 p-5 rounded-xl max-h-[50rem] overflow-y-auto cart-scroll">
        {cart?.cartItems
          ?.filter((item) => item.product?._id)
          .map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b last:border-b-0 border-zinc-200 py-5"
            >
              <div className="flex items-center gap-4">
                {item.product?.imgCover && (
                  <Image
                    src={item.product.imgCover}
                    alt={item.product.title}
                    width={117}
                    height={140}
                    className="rounded-lg object-cover w-28 h-36"
                  />
                )}

                <CartProductDetails item={item} />
              </div>

              <div className="flex flex-col sm:flex-col justify-between sm:items-end sm:h-[8.75rem] items-start gap-3">
                <DeleteProduct productId={item.product._id} />

                <CartQuantityControl
                  productId={item.product._id}
                  stock={item.product.quantity}
                  initialQty={item.quantity}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
