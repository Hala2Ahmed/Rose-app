"use client";

import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "@/lib/services/addresses.service";
import type { Address } from "@/lib/types/address";

export default function useAddresses() {
  const { data, isLoading, error } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  return {
    addresses: data ?? [],
    isLoading,
    error,
  };
}