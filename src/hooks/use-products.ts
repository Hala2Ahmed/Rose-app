import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/lib/types/products";
import { getProducts } from "@/app/[locale]/(site)/(homepage)/_services/products.service";

interface ProductsParams {
  page: number;
  limit?: number;
  filters?: Record<string, string>;
  initialData?: ProductsResponse;
}

export function useProducts({
  page,
  limit = 12,
  filters = {},
  initialData,
}: ProductsParams) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, JSON.stringify(filters)],
    queryFn: () => getProducts(page, limit, filters),
    initialData,
    placeholderData: (previousData) => previousData,
  });
}
