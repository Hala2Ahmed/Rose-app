//This hook only for test
//TODO: use Hala's hook
import { useMutation } from "@tanstack/react-query";

export default function useSendOtp() {
    const { isPending, mutate, error } = useMutation({
        mutationFn: async (email: { email: string }) => {
            console.log("🚀 ~ useSendOtp ~ email:", email)
        },
    });

    return { isPending, error, sendOtp: mutate };
}