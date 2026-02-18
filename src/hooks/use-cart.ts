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
import { updateCartAction } from "@/app/[locale]/(site)/cart/actions/update-cart.action";
import { useTranslations } from "next-intl";

// fetch the user's cart.
export function useCartQuery() {
  const { status, data: session } = useSession();

  return useQuery<Cart>({
    queryKey: CART_KEY,
    enabled: status !== "loading",
    queryFn: async () => {
      if (session?.user) return fetchCart();
      const guestCartItems = readGuestCart();

      const totalPrice = guestCartItems.reduce((sum, item) => {
        const itemPrice =
          item.product.priceAfterDiscount && item.product.priceAfterDiscount > 0
            ? item.product.priceAfterDiscount
            : item.product.price;
        return sum + itemPrice * item.quantity;
      }, 0);
      return { cartItems: guestCartItems, totalPrice } as Cart;
    },
    staleTime: 1000 * 30,
  });
}

// Add a product to the cart.
export function useAddToCart() {
  //Translation
  const t = useTranslations("cart");

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
    retry: 2,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success(t("product-added-successfully"));
    },
    onError: (error) => {
      toast.error(error.message);
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
    if (!guestCart.length) return;

    (async () => {
      try {
        const serverCart = await fetchCart();

        const serverMap = new Map(
          serverCart.cartItems.map((item) => [item.product._id, item.quantity]),
        );

        const actions = guestCart
          .filter((item) => item.product?._id)
          .map((item) => {
            const productId = item.product._id;
            const guestQty = item.quantity;
            const serverQty = serverMap.get(productId);

            if (serverQty === undefined) {
              return addToCartAction(productId, guestQty);
            }

            if (serverQty !== guestQty) {
              return updateCartAction(productId, guestQty);
            }

            return null;
          })
          .filter(Boolean);

        if (actions.length === 0) {
          clearGuestCart();
          return;
        }

        const results = await Promise.allSettled(actions);

        const hasFailure = results.some(
          (result) => result.status === "rejected",
        );

        if (hasFailure) {
          console.error("Some cart items failed to sync:", results);
          syncedRef.current = false;
          return;
        }

        clearGuestCart();

        await qc.invalidateQueries({ queryKey: CART_KEY });
      } catch (error) {
        console.error("Failed to sync guest cart:", error);
        syncedRef.current = false;
      }
    })();
  }, [session?.user, qc]);
}
