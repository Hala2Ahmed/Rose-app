import { getOccasionById } from "@/lib/api/get-occasion-by-id";
import { useQuery } from "@tanstack/react-query";

export default function useGetSingleOccasion(id: string | string[]) {
  const {
    error,
    data: occasion,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await getOccasionById(id);
      console.log(response, "rr");

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response.data;
    },
    queryKey: ["occasions", id],
  });

  return {
    error,
    occasion,
    isLoading,
  };
}
