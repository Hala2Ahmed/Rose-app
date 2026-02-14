import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Addresses, AddressFields } from "@/lib/types/addresses";
import { updateAddressAction } from "../../lib/actions/address/update-address.action";

export default function useUpdateAddress(id: string) {
    // query client
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: async (fields: AddressFields) => {
            const response = await updateAddressAction(fields, id);

            {/* Error */ }
            if ("error" in response) {
                throw new Error(response?.error || "Something went wrong. Please try again.");
            }

            {/* Success */ }
            return response;
        },
        onSuccess: (response) => {
            queryClient.setQueryData<Addresses>(["addresses"], () => response);
        }
    });

    return { isPending, error, updateAddress: mutate };
}