"use client";

import { useCartQuery, useSyncGuestCart } from "@/hooks/use-cart";
import React from "react";

export default function CartItems() {
  const { data: cart } = useCartQuery();

  const cartCount: number =
    cart?.cartItems?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  useSyncGuestCart();
  return (
    <>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-maroon-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center dark:bg-softPink-300 dark:text-zinc-900">
          {cartCount}
        </span>
      )}
    </>
  );
}
