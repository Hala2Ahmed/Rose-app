import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAction } from "../actions/delete-product.action";
import { toast } from "sonner";
import {
  CART_KEY,
  readGuestCart,
  writeGuestCart,
} from "@/lib/utils/cart-storage";
import { useTranslations } from "next-intl";

// Custom hook to remove a single product from the cart (works for both logged-in and guest users)
export function useDeleteProductFromCart(isAuthenticated: boolean) {
  //Translation
  const t = useTranslations("cart");

  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (isAuthenticated) {
        return await deleteProductAction(productId);
      }

      const cart = readGuestCart();
      const updatedCart = cart.filter((item) => item.product._id !== productId);
      writeGuestCart(updatedCart);
      return updatedCart;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success(t("product-removed-successfully"));
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
