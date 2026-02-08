"use client";

import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  addToCartApi,
  fetchCart,
} from "@/app/[locale]/(site)/cart/_services/cart.service";
import { toast } from "sonner";
import type { ProductDetails } from "@/lib/types/product-details";
import { CartItem } from "@/lib/types/cart";

const CART_KEY = ["cart"];
const GUEST_KEY = "guest_cart";

// Reads the guest cart from localStorage.
function readGuestCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(GUEST_KEY) || "[]");
}

// Saves the guest cart to localStorage.
function writeGuestCart(cart: CartItem[]) {
  localStorage.setItem(GUEST_KEY, JSON.stringify(cart));
}

// Clears the guest cart from localStorage.
function clearGuestCart() {
  localStorage.removeItem(GUEST_KEY);
}

// fetch the user's cart.
export function useCartQuery() {
  const { data: session, status } = useSession();

  return useQuery<CartItem[]>({
    queryKey: CART_KEY,
    enabled: status !== "loading",
    queryFn: async () => {
      if (session?.user) {
        return fetchCart();
      }
      return readGuestCart();
    },
    staleTime: 1000*30,
    gcTime: 1000*60*5,
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
        return addToCartApi(product._id, quantity);
      }

      // Guest cart handling
      const cart = readGuestCart();
      const existing = cart.find((i) => i.product._id === product._id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }

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
    if (!session?.user|| syncedRef.current) return;

    syncedRef.current = true;

    const guestCart = readGuestCart();

    (async () => {
      try{
           if (guestCart.length) {
        for (const item of guestCart) {
          await addToCartApi(item.product._id, item.quantity);
        }
        clearGuestCart();
      }

      qc.invalidateQueries({ queryKey: CART_KEY });
      } catch (error) {
        toast.error("Failed to sync guest cart");
      }
    })();
  }, [session?.user, qc]);
}
