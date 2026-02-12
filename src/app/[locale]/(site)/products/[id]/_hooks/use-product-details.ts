"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../_services/product-details.service";

export default function useProductDetails(id: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id, // only fetch if id exists
  });

  return {
    isLoading,
    product: data,
    error,
  };
}
