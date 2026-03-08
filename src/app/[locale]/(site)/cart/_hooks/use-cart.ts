import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../_services/cart-item.service";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
}
