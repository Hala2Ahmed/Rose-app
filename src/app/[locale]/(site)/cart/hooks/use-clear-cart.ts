import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCartAction } from "../actions/clear-cart.action";
import { CART_KEY } from "@/lib/utils/cart-storage";

// hook to clear the cart (for both authenticated and guest users)
export function useClearCart(isAuthenticated: boolean) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        await deleteCartAction();
      } else {
        localStorage.removeItem("guest_cart");
      }
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Cart cleared successfully");
    },

    onError: () => {
      toast.error("Failed to clear cart");
    },
  });
}
