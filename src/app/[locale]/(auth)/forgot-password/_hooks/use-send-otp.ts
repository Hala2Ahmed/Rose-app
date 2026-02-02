import { EmailStepFields } from "@/lib/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { sendOtpAction } from "../_actions/send-otp.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useSendOtp() {
  //Translation
  const t = useTranslations("auth.forgot-password.email-step");

  //Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      const response = await sendOtpAction(fields);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    // On success, show toast
    onSuccess: () => {
      toast.success(t("success-toast"));
    },
  });

  return { isPending, error, sendOtp: mutate };
}
