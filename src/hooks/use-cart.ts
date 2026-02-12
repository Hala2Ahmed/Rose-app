"use client";

import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import type { ProductDetails } from "@/lib/types/product-details";
import type { Cart } from "@/lib/types/cart";
import { addToCartAction } from "@/app/[locale]/(site)/cart/actions/cart.action";
import {
  CART_KEY,
  clearGuestCart,
  readGuestCart,
  writeGuestCart,
} from "@/lib/utils/cart-storage";
import { fetchCart } from "@/app/[locale]/(site)/cart/actions/fetch-cart.action";

// fetch the user's cart.
export function useCartQuery() {
  const { status, data: session } = useSession();

  return useQuery<Cart>({
    queryKey: CART_KEY,
    enabled: status !== "loading",
    queryFn: async () => {
      if (session?.user) return fetchCart();
      return { cartItems: readGuestCart(), totalPrice: 0 } as Cart;
    },
    staleTime: 1000 * 30,
  });
}

// Add a product to the cart.
export function useAddToCart() {
  const qc = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: ProductDetails;
      quantity: number;
    }) => {
      if (session?.user) {
        return addToCartAction(product._id, quantity);
      }

      // Guest cart
      const cart = readGuestCart();
      const existing = cart.find((i) => i.product._id === product._id);

      if (existing) existing.quantity += quantity;
      else
        cart.push({
          quantity,
          product: {
            title: product.title,
            imgCover: product.imgCover,
            price: product.price,
            priceAfterDiscount: product.priceAfterDiscount,
            rateAvg: product.rateAvg,
            rateCount: product.rateCount,
            _id: product._id,
            quantity: product.quantity,
          },
        });

      writeGuestCart(cart);
      return cart;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Product added to cart successfully");
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });
}

// sync the guest cart to the server after the user logs in.
export function useSyncGuestCart() {
  const { data: session } = useSession();
  const qc = useQueryClient();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!session?.user || syncedRef.current) return;

    syncedRef.current = true;
    const guestCart = readGuestCart();

    (async () => {
      try {
        if (guestCart.length === 0) {
          clearGuestCart();
          return;
        }

        for (const item of guestCart) {
          if (!item.product._id) continue;
          await addToCartAction(item.product._id, item.quantity);
        }

        clearGuestCart();
        qc.invalidateQueries({ queryKey: ["cart"] });
      } catch (err) {
        console.error("Failed to sync guest cart:", err);
        clearGuestCart();
      }
    })();
  }, [session?.user, qc]);
}
