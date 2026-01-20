import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { resetPasswordStepFields } from "@/lib/types/auth.type";
import { useTranslations } from "next-intl";
import { resetPasswordAction } from "../_actions/reset-password.action";

export default function useResetPassword() {
  //Translation
  const t = useTranslations("auth.forgot-password.reset-password-step");

  //Router
  const router = useRouter();

  //Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: resetPasswordStepFields & { email: string }) => {
      const response = await resetPasswordAction({
        email: fields.email,
        newPassword: fields.password,
      });

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },

    // On success, show toast and redirect to login
    onSuccess: () => {
      toast.success(t("success-toast"));
      router.push("/login");
    },
  });

  return { isPending, error, resetPassword: mutate };
}
