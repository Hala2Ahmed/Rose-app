import { getOccasionById } from "@/lib/api/get-occasion-by-id";
import { useQuery } from "@tanstack/react-query";

export default function useGetSingleOccasion(id?: string | string[]) {
  const {
    error,
    data: occasion,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await getOccasionById(id!);

      if (!response || "error" in response) {
        throw new Error(response?.error ?? "Failed to fetch occasion");
      }

      return response.data;
    },
    queryKey: ["occasions", id],
    enabled: !!id,
  });

  return {
    error,
    occasion,
    isLoading,
  };
}
