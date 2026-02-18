import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePhotoAction } from "../_actions/change-photo.action";
import { useTranslations } from "next-intl";

export default function useChangePhoto() {
  const t = useTranslations("profile");
  const {
    error,
    mutate: changePhoto,
    isPending,
  } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await changePhotoAction(formData);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("photo-success"));
    },
    onError: (error) => {
      toast.error(error.message || t("photo-error"));
    },
  });

  return {
    error,
    changePhoto,
    isPending,
  };
}
