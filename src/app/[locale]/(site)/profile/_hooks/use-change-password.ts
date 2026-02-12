"use client";
import { updateSessionToken } from "@/lib/utils/manage-token";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePasswordAction } from "../_actions/change-password.action";
import { ChangePasswordFields } from "@/lib/types/auth";
import { useTranslations } from "next-intl";

export default function useChangePassword() {
  const t = useTranslations("auth");
  const {
    error,
    mutate: changePassword,
    isPending,
  } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const response = await changePasswordAction(fields);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: async (response) => {
      if (response.token) {
        await updateSessionToken(response.token);
      }
      toast.success(t("password-changed-success"));
    },
  });

  return {
    error,
    changePassword,
    isPending,
  };
}
