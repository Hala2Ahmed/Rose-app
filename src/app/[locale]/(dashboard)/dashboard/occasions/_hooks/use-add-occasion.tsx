import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { addOccasionAction } from "../_actions/add-occasion.action";

export default function useAddOccasion() {
  //translations
  const t = useTranslations("dashboard.occasions");
  const router = useRouter();

  //mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await addOccasionAction(data);
      if ("error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: async () => {
      toast.success(t("add-success"));
      router.push("/dashboard/occasions");
    },
  });

  return {
    addOccasion: mutate,
    isPending,
    error,
  };
}
