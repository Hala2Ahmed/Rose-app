import { useMutation } from "@tanstack/react-query";
import { OtpStepFields } from "../../../../../lib/types/auth";
import { verifyOtpAction } from "../_actions/verify-otp.action";

export default function useVerifyOtp() {
    const { isPending, mutate, error } = useMutation({
        mutationFn: async (fields: OtpStepFields) => {
            const response = await verifyOtpAction(fields);

            {/* Error */ }
            if ("error" in response) {
                throw new Error(response?.error || "Something went wrong. Please try again.");
            }

            {/* Success */ }
            return response;
        },
    });

    return { isPending, error, VerifyOTP: mutate };
}