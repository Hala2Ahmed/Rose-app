import { useQuery } from "@tanstack/react-query";
import { Addresses } from "../../lib/types/addresses";

export default function useUserAddresses() {
    const { data, isLoading, error } = useQuery<Addresses>({
        queryKey: ["addresses"],
        queryFn: async () => {
            const res = await fetch(`/api/user-addresses`);

            if (!res.ok) {
                throw new Error("Failed to fetch subject");
            }

            return res.json();
        },
    });

    return { addresses: data, isLoading, error };
}