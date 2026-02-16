import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../_services/get-profile-data.service";

export default function useGetProfileData() {
  const {
    error,
    data: profileData,
    isPending,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await getProfileService();

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    queryKey: ["profile-data"],
  });

  return {
    error,
    profileData,
    isPending,
    refetch,
    isLoading,
  };
}
