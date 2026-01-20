import { EmailStepFields } from "@/lib/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { sendOtpAction } from "../_actions/send-otp.action";

export default function useSendOtp() {
  //Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      const response = await sendOtpAction(fields);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  return { isPending, error, sendOtp: mutate };
}
