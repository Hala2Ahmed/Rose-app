import { CartItem } from "../types/cart";

export const CART_KEY = ["cart"];
const GUEST_KEY = "guest_cart";

// Reads the guest cart from localStorage.
export function readGuestCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(GUEST_KEY) || "[]");
}

// Saves the guest cart to localStorage.
export function writeGuestCart(cart: CartItem[]) {
  localStorage.setItem(GUEST_KEY, JSON.stringify(cart));
}

// Clears the guest cart from localStorage.
export function clearGuestCart() {
  localStorage.removeItem(GUEST_KEY);
}
