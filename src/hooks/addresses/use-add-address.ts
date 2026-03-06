import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Addresses, AddressFields } from "@/lib/types/addresses";
import { addAddressAction } from "../../lib/actions/address/add-address.action";

export default function useAddAddress() {
    // query client
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: async (fields: AddressFields) => {
            const response = await addAddressAction(fields);

            {/* Error */ }
            if ("error" in response) {
                throw new Error(response?.error || "Something went wrong. Please try again.");
            }

            {/* Success */ }
            return response;
        },
        onSuccess: (response) => {
            queryClient.setQueryData<Addresses>(["addresses"], () => {
                return {
                    ...response,
                    addresses: response.address,
                };
            });
        }
    });

    return { isPending, error, addAddress: mutate };
}