"use client";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import { DeleteAccountAction } from "../_actions/delete-account.action";

export default function useDeleteAccount() {
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await DeleteAccountAction();
      if ("error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: async () => {
      toast.success("Account deleted successfully");
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    },
    onError: (err) => {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to delete account";
      setDeleteErrorMessage(errorMsg);
    },
  });

  const clearError = () => setDeleteErrorMessage("");

  return {
    deleteAccount: mutate,
    isPending,
    deleteErrorMessage,
    clearError,
  };
}
