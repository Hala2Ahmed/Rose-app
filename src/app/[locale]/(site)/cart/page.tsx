// ⚠️ This page is only for testing/debugging the cart functionality.
// It will be removed later before marge.

"use client";

import { useCart } from "@/components/providers/cart.provider";
import Image from "next/image";

export default function CartPage() {
  const { cart, cartCount } = useCart();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Cart (Debug Page)</h1>

      <div className="text-sm text-zinc-600">
        Total items: <span className="font-semibold">{cartCount}</span>
      </div>

      {cart.length === 0 ? (
        <p className="text-zinc-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border p-4 rounded-md items-center"
            >
              <Image
                width={64}
                height={64}
                src={item.product.imgCover}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-zinc-500">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-zinc-500">
                  Price: {item.product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
