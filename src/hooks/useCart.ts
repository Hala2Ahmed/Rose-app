"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  addToCart,
  removeFromCart,
} from "@/app/[locale]/(site)/(homepage)/_services/cart.service";

const CART_KEY = "guest_cart";

/* ===== localStorage Helpers ===== */
function getGuestCart(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to parse guest cart:", err);
    return [];
  }
}

function setGuestCart(cart: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ===== useCart Hook ===== */
export function useCart(products: { _id: string }[] = []) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const isAuthenticated = !!session?.user;

  const [cart, setCart] = useState<string[]>([]);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const syncedRef = useRef(false);

  // فقط IDs لتجنب rerender متكرر
  const productIds = useMemo(() => products.map((p) => p._id), [products]);

  /* ---------- Merge Guest Cart on Login ---------- */
  const mergeGuestCartRaw = useCallback(async () => {
    if (!accessToken) return;

    const guestCart = getGuestCart();
    if (!guestCart.length) return;

    const toAdd = guestCart.filter((id) => productIds.includes(id));
    const remainingGuestCart = guestCart.filter((id) => !toAdd.includes(id));

    if (toAdd.length > 0) {
      try {
        await Promise.all(toAdd.map((id) => addToCart(id, accessToken)));
        toast.success("Cart synced 🛒");
      } catch (err: unknown) {
        console.error("Failed to merge cart:", err);
        toast.error("Couldn't sync cart");
      }
    }

    setCart((prev) => {
      const combined = Array.from(
        new Set([...prev, ...toAdd, ...remainingGuestCart]),
      );
      const isSame =
        prev.length === combined.length &&
        prev.every((id) => combined.includes(id));
      return isSame ? prev : combined;
    });

    setGuestCart(remainingGuestCart);
  }, [accessToken, productIds]);

  /* ---------- Load Initial Cart ---------- */
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      if (!syncedRef.current) {
        syncedRef.current = true;
        mergeGuestCartRaw();
      }
    } else {
      setCart(getGuestCart());
    }
  }, [accessToken, isAuthenticated, productIds, mergeGuestCartRaw]);

  /* ---------- Mutations for Authenticated Users ---------- */
  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return addToCart(productId, accessToken);
    },
    onSuccess: (_, productId) => {
      setCart((prev) => Array.from(new Set([...prev, productId])));
      toast.success("Added to cart");
    },
    onError: (err, productId) => {
      setCart((prev) => prev.filter((id) => id !== productId));
      toast.error(err?.message || "Failed to add to cart");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return removeFromCart(productId, accessToken);
    },
    onSuccess: (_, productId) => {
      setCart((prev) => prev.filter((id) => id !== productId));
      toast.success("Removed from cart");
    },
    onError: (err, productId) => {
      setCart((prev) => Array.from(new Set([...prev, productId])));
      toast.error(err?.message || "Failed to remove from cart");
    },
  });

  /* ---------- Toggle Cart ---------- */
  const toggleCart = (productId: string) => {
    const isIn = cart.includes(productId);

    setTogglingId(productId);

    // Optimistic UI
    setCart((prev) =>
      isIn ? prev.filter((id) => id !== productId) : [...prev, productId],
    );

    if (isAuthenticated && accessToken) {
      isIn ? removeMutation.mutate(productId) : addMutation.mutate(productId);
    } else {
      // Guest → localStorage
      const updated = isIn
        ? cart.filter((id) => id !== productId)
        : Array.from(new Set([...cart, productId]));
      setCart(updated);
      setGuestCart(updated);
      toast.success(isIn ? "Removed from cart" : "Added to cart");
    }

    setTogglingId(null);
  };

  /* ---------- Helpers ---------- */
  const cartSet = useMemo(() => new Set(cart), [cart]);
  const isInCart = (productId: string) => cartSet.has(productId);

  return {
    cart,
    cartCount: cart.length,
    toggleCart,
    isInCart,
    mergeGuestCart: mergeGuestCartRaw,
    togglingId,
  };
}
