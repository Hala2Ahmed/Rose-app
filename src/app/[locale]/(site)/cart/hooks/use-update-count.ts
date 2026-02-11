import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  readGuestCart,
  writeGuestCart,
  CART_KEY,
} from "@/lib/utils/cart-storage";
import { updateCartAction } from "../actions/update-cart";

// Custom hook to update product quantity in the cart (supports both logged-in and guest users)
export function useUpdateCart(productId: string, isAuthenticated: boolean) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (newQty: number) => {
      if (isAuthenticated) {
        return await updateCartAction(productId, newQty);
      } else {
        const cart = readGuestCart();
        const item = cart.find((i) => i.product._id === productId);
        if (item) item.quantity = newQty;
        writeGuestCart(cart);
        return cart;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Quantity updated successfully");
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });
}