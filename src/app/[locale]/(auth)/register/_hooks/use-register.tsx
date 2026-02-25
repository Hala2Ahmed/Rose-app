import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerAction } from "../_actions/register.action";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { RegisterFields } from "@/lib/types/auth";

export default function useRegister() {
  //translations
  const t = useTranslations("auth.register");

  //navigation
  const navigate = useRouter();

  //Mutation
  const {
    error,
    mutate: register,
    isPending,
  } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const response = await registerAction(fields);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: (data, variables) => {
      toast.success(t("register-success"));
      navigate.push(`/login?email=${encodeURIComponent(variables.email)}`);
    },
  });

  return {
    error,
    register,
    isPending,
  };
}
