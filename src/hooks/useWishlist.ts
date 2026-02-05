"use client";

import { useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/[locale]/(site)/(homepage)/_services/wishlist.service";

const WISHLIST_KEY = "guest_wishlist";

/* ================= Cookies Helpers ================= */

function getGuestWishlist(): string[] {
  if (typeof document === "undefined") return [];

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${WISHLIST_KEY}=`));

  if (!match) return [];

  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return [];
  }
}

function setGuestWishlist(wishlist: string[]) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  document.cookie = `${WISHLIST_KEY}=${encodeURIComponent(
    JSON.stringify(wishlist),
  )}; expires=${expires.toUTCString()}; path=/`;
}

function clearGuestWishlist() {
  if (typeof document === "undefined") return;

  document.cookie = `${WISHLIST_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/* ================= Hook ================= */

export function useWishlist() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  /* ---------- Optimistic Update ---------- */
  const optimisticUpdate = (productId: string, value: boolean) => {
    queryClient.setQueriesData(
      { queryKey: ["products"], exact: false },
      (old: any) => {
        if (!old) return old;

        return {
          ...old,
          products: old.products.map((p: any) =>
            p._id === productId ? { ...p, isInWishlist: value } : p,
          ),
        };
      },
    );
  };

  /* ---------- Mutations ---------- */
  const addMutation = useMutation({
    mutationFn: (productId: string) =>
      addToWishlist(productId, session?.accessToken!),
    onMutate: (productId: string) => {
      optimisticUpdate(productId, true);
    },
    onError: (_err, productId) => {
      optimisticUpdate(productId, false);
      toast("Something went wrong", { description: "Please try again" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      removeFromWishlist(productId, session?.accessToken!),
    onMutate: (productId: string) => {
      optimisticUpdate(productId, false);
    },
    onError: (_err, productId) => {
      optimisticUpdate(productId, true);
      toast("Something went wrong", { description: "Please try again" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  /* ---------- Merge Guest Wishlist ---------- */
  const mergeGuestWishlist = async () => {
    const guestWishlist = getGuestWishlist();
    if (!guestWishlist.length || !session?.accessToken) return;

    try {
      await Promise.all(
        guestWishlist.map((id) => addToWishlist(id, session.accessToken!)),
      );
      clearGuestWishlist();
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("Wishlist synced ❤️", {
        description: "Your saved items are now in your account",
      });
    } catch {
      toast("Couldn't sync wishlist", { description: "We'll try again later" });
    }
  };

  useEffect(() => {
    if (session) mergeGuestWishlist();
  }, [session]);

  /* ---------- Toggle Wishlist ---------- */
  const toggleWishlist = (productId: string) => {
    if (isAuthenticated && session?.accessToken) {
      const wishlist = queryClient.getQueryData<string[]>(["wishlist"]) ?? [];
      const isInWishlist = wishlist.includes(productId);

      if (isInWishlist) removeMutation.mutate(productId);
      else addMutation.mutate(productId);

      return;
    }

    // Guest
    const wishlist = getGuestWishlist();
    const isInWishlist = wishlist.includes(productId);

    if (isInWishlist) {
      setGuestWishlist(wishlist.filter((id) => id !== productId));
      optimisticUpdate(productId, false);
      toast("Removed from wishlist", { description: "Saved in cookies" });
    } else {
      setGuestWishlist([...wishlist, productId]);
      optimisticUpdate(productId, true);
      toast("Saved for later ❤️", { description: "Saved in cookies" });
    }
  };

  return {
    toggleWishlist,
    getGuestWishlist,
  };
}
