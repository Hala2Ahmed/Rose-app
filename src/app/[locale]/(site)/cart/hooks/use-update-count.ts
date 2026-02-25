import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  readGuestCart,
  writeGuestCart,
  CART_KEY,
} from "@/lib/utils/cart-storage";
import { updateCartAction } from "../actions/update-cart.action";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

// Custom hook to update product quantity in the cart (supports both logged-in and guest users)
export function useUpdateCart(
  productId: string,
  isAuthenticated: boolean,
  initialQty: number,
  stock: number,
) {
  //Translation
  const t = useTranslations("cart");

  const qc = useQueryClient();
  const [quantity, setQuantity] = useState(initialQty);
  const debouncedQuantity = useDebounce(quantity, 500);

  const mutation = useMutation({
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
    retry: 2,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CART_KEY });
      toast.success(t('quantity-updated-successfully'));
    },
    onError: (error) => {
      setQuantity(initialQty); // Revert on error
      toast.error(error.message);
    },
  });

  // Sync debounced quantity to server
  useEffect(() => {
    if (
      debouncedQuantity !== initialQty &&
      debouncedQuantity >= 1 &&
      debouncedQuantity <= stock
    ) {
      mutation.mutate(debouncedQuantity);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  const handleQuantityChange = (newVal: number) => {
    if (newVal >= 1 && newVal <= stock) {
      setQuantity(newVal);
    }
  };

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(quantity - 1);

  return {
    quantity,
    setQuantity: handleQuantityChange,
    increment,
    decrement,
    isUpdating: mutation.isPending,
    canIncrement: quantity < stock,
    canDecrement: quantity > 1,
  };
}
