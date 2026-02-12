"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePhotoAction } from "../_actions/change-photo.action";

export default function useChangePhoto() {
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
      toast.success("Your photo successfully uploaded");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload photo");
    },
  });

  return {
    error,
    changePhoto,
    isPending,
  };
}
