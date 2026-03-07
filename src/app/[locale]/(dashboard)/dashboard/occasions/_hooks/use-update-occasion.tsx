import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { updateOccasionAction } from "../_actions/update-occasion.action";
import { OccasionFields } from "@/lib/types/occasions.types";

export default function useUpdateOccasion(id: string | string[]) {
  //translations
  const t = useTranslations("dashboard.occasions");
  const router = useRouter();

  //mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: OccasionFields) => {
      const response = await updateOccasionAction(data, id);
      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: async () => {
      toast.success(t("edit-success"));
      router.push("/dashboard/occasions");
    },
  });

  return {
    updateOccasion: mutate,
    isPending,
    error,
  };
}
