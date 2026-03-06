import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddressAction } from "../../lib/actions/address/delete-address.action";
import type { Addresses } from "../../lib/types/addresses";

export default function useDeleteAddress() {
    // query client
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: async (id: string) => {
            const response = await deleteAddressAction(id);

            {/* Error */ }
            if ("error" in response) {
                throw new Error(response?.error || "Something went wrong. Please try again.");
            }

            {/* Success */ }
            return response;
        },
        onSuccess: (_, id) => {
            queryClient.setQueryData<Addresses>(["addresses"], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    addresses: old.addresses.filter((address) => address._id !== id)
                };
            });
        }
    });

    return { isPending, error, deleteAddress: mutate };
}