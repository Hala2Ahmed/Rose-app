"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/[locale]/(site)/(homepage)/_services/wishlist.service";

const WISHLIST_KEY = "guest_wishlist";

/* ===== localStorage Helpers ===== */
function getGuestWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to parse guest wishlist:", err);
    return [];
  }
}

function setGuestWishlist(wishlist: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

/* ===== useWishlist Hook ===== */
export function useWishlist(products: { _id: string }[] = []) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const isAuthenticated = !!session?.user;

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const syncedRef = useRef(false);

  const productIds = useMemo(() => products.map((p) => p._id), [products]);

  /* ---------- Merge Guest Wishlist on Login ---------- */
  const mergeGuestWishlist = useCallback(async () => {
    if (!accessToken) return;

    const guestWishlist = getGuestWishlist();
    if (!guestWishlist.length) return;

    const toAdd = guestWishlist.filter((id) => productIds.includes(id));
    const remainingGuestWishlist = guestWishlist.filter(
      (id) => !toAdd.includes(id)
    );

    if (toAdd.length > 0) {
      try {
        await Promise.all(toAdd.map((id) => addToWishlist(id, accessToken)));
        toast.success("Wishlist synced ❤️");
      } catch (err: any) {
        console.error("Failed to merge wishlist:", err);
        toast.error("Couldn't sync wishlist");
      }
    }

    setWishlist((prev) => {
      const combined = Array.from(
        new Set([...prev, ...toAdd, ...remainingGuestWishlist])
      );
      const isSame =
        prev.length === combined.length &&
        prev.every((id) => combined.includes(id));
      return isSame ? prev : combined;
    });

    setGuestWishlist(remainingGuestWishlist);
  }, [accessToken, productIds]);

  /* ---------- Load Initial Wishlist ---------- */
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      if (!syncedRef.current) {
        syncedRef.current = true;
        mergeGuestWishlist();
      }
    } else {
      setWishlist(getGuestWishlist());
    }
  }, [accessToken, isAuthenticated, productIds]);

  /* ---------- Mutations for Authenticated Users ---------- */
  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return addToWishlist(productId, accessToken);
    },
    onSuccess: (_, productId) => {
      setWishlist((prev) => Array.from(new Set([...prev, productId])));
      toast.success("Added to wishlist");
    },
    onError: (err: any, productId) => {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      toast.error(err?.message || "Failed to add to wishlist");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return removeFromWishlist(productId, accessToken);
    },
    onSuccess: (_, productId) => {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      toast.success("Removed from wishlist");
    },
    onError: (err: any, productId) => {
      setWishlist((prev) => Array.from(new Set([...prev, productId])));
      toast.error(err?.message || "Failed to remove from wishlist");
    },
  });

  /* ---------- Toggle Wishlist ---------- */
  const toggleWishlist = (productId: string) => {
    const isIn = wishlist.includes(productId);

    setTogglingId(productId);

    // Optimistic UI
    setWishlist((prev) =>
      isIn ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    if (isAuthenticated && accessToken) {
      isIn ? removeMutation.mutate(productId) : addMutation.mutate(productId);
    } else {
      const updated = isIn
        ? wishlist.filter((id) => id !== productId)
        : Array.from(new Set([...wishlist, productId]));
      setWishlist(updated);
      setGuestWishlist(updated);
      toast.success(isIn ? "Removed from wishlist" : "Added to wishlist");
    }

    setTogglingId(null);
  };

  /* ---------- Helpers ---------- */
  const wishlistSet = useMemo(() => new Set(wishlist), [wishlist]);
  const isInWishlist = (productId: string) => wishlistSet.has(productId);

  return {
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isInWishlist,
    mergeGuestWishlist,
    togglingId, 
  };
}
