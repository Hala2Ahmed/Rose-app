"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useCartQuery } from "@/hooks/use-cart";
import DeleteProduct from "./delete-product-btn";
import CartHeader from "./cart-header";
import EmptyCart from "./empty-cart";
import ContinueShopping from "./continue-shopping-btn";
import CartQuantityControl from "./update-cart";
import CartSkeleton from "@/components/skeletons/cart.skeleton";
import { useTranslations } from "next-intl";

export default function CartPage() {
  //Translation
  const t = useTranslations("product");

  //Hooks
  const { data: cart, isPending } = useCartQuery();

  if (isPending) return <CartSkeleton />;
  if (!cart || cart.cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[782px] mb-12">
      {/*Cart Header */}
      <CartHeader
        cartLength={cart.cartItems.length}
        disabled={!cart || cart.cartItems.length === 0}
      />

      {/* Cart Items */}
      <div className="border border-zinc-200 p-5 rounded-xl max-h-[50rem] overflow-y-auto cart-scroll">
        {cart.cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between border-b last:border-b-0 border-zinc-200 py-5"
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

              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-maroon-700 text-lg font-semibold">
                    {item.product?.title}
                  </h2>
                  <div className="flex gap-1 mt-1">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                    {item.product?.rateAvg > 0 ? (
                      <span className="text-sm text-zinc-700">
                        <span className="font-medium">
                          {item.product?.rateAvg.toFixed(1)}/5
                        </span>{" "}
                        <span className="font-medium text-blue-600">
                          ({item.product?.rateCount} {t("rate-count")} )
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-400">
                        {t("no-ratings-yet")}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    <span className="text-sm font-medium text-maroon-600">
                      ({item.quantity})
                    </span>{" "}
                    {(item.product?.priceAfterDiscount &&
                    item.product?.priceAfterDiscount > 0
                      ? item.product.priceAfterDiscount
                      : item.product?.price
                    )?.toFixed(2)}{" "}
                    <span className="text-sm font-medium text-zinc-800">
                      EGP
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end h-[140px] ms-32">
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

      {/* Continue Shopping btn */}
      <ContinueShopping />
    </div>
  );
}
