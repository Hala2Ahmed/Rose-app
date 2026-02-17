import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCartAction } from "../actions/clear-cart.action";
import { CART_KEY } from "@/lib/utils/cart-storage";
import { useTranslations } from "next-intl";

// hook to clear the cart (for both authenticated and guest users)
export function useClearCart(isAuthenticated: boolean) {
  //Translation
  const t = useTranslations("cart");

  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        await deleteCartAction();
      } else {
        localStorage.removeItem("guest_cart");
      }
    },
    retry: 2,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success(t('clear-cart-successfully'));
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
