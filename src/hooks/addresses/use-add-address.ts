import { useMutation } from "@tanstack/react-query";
import { AddressFields } from "@/lib/types/addresses";
import { addAddressAction } from "../../lib/actions/address/add-address.action";

export default function useAddAddress() {
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
    });

    return { isPending, error, addAddress: mutate };
}