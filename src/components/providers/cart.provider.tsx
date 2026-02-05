"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import {
  addProductToServerCart,
  fetchServerCart,
} from "@/app/[locale]/(site)/cart/_services/cart.service";
import { toast } from "sonner";
import { CartContextType, CartItem } from "@/lib/types/cart";
import { ProductDetails } from "@/lib/types/product-details";

// Create Cart Context
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const syncedRef = useRef(false);

  // Sync guest cart to server after login
  const syncGuestCartToServer = async () => {
    const guestCart: CartItem[] = JSON.parse(
      localStorage.getItem("guest_cart") || "[]",
    );
    if (!guestCart.length) return;

    for (const item of guestCart) {
      await addProductToServerCart(item.product._id, item.quantity);
    }

    localStorage.removeItem("guest_cart");
    const serverCart = await fetchServerCart();
    setCart(serverCart);
  };

  useEffect(() => {
    const loadCart = async () => {
      if (status === "unauthenticated") {
        const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        setCart(guest);
      }

      if (status === "authenticated") {
        const serverCart = await fetchServerCart();
        setCart(serverCart);
      }
    };

    loadCart();
  }, [status]);

  useEffect(() => {
    if (status === "authenticated" && !syncedRef.current) {
      syncedRef.current = true;
      syncGuestCartToServer();
    }
  }, [status]);

  // Add product to cart (guest or user)
  const addToCartHandler = async (product: ProductDetails, quantity = 1) => {
    try {
      if (status === "authenticated") {
        const updatedCart = await addProductToServerCart(product._id, quantity);
        setCart(updatedCart);
      } else {
        // Add to guest cart in localStorage
        const guestCart: CartItem[] = JSON.parse(
          localStorage.getItem("guest_cart") || "[]",
        );
        const existing = guestCart.find((i) => i.product._id === product._id);

        if (existing) existing.quantity += quantity;
        else guestCart.push({ product, quantity });

        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        setCart(guestCart);
      }
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  // Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart: addToCartHandler }}
    >
      {children}
    </CartContext.Provider>
  );
};

//Hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
