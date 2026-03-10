"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  updateProfileAction,
  changePasswordAction,
  deleteAccountAction,
  uploadProfilePhotoAction,
  type ActionResult,
} from "../features/profile/actions/profile.actions";

import type { UpdateProfilePayload } from "@/lib/types/profile";
import type { ChangePasswordFields } from "@/lib/schemes/profile.schema";

  // React Query key used to cache the profile data
const PROFILE_QUERY_KEY = ["profile"];

/**
 * Helper function to handle server action results
 * - Shows success toast if the action succeeded
 * - Shows error toast and throws error if failed
 */
function handleResult<T>(result: ActionResult<T>, successMessage?: string) {
  if (result.success) {
    toast.success(successMessage ?? result.message ?? "Done.");
    return result;
  }
  toast.error(result.error);
  throw new Error(result.error);
}

/**
 * Mutation to update user profile information
 * - Calls updateProfileAction
 * - Shows success/error toast
 * - Invalidates profile query to refresh the cached profile data
 */
export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const result = await updateProfileAction(payload);
      handleResult(result, "Profile updated successfully.");
      return result;
    },

    // Refresh profile data after successful update
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

/**
 * Mutation to change the user password
 * - Sends current password and new password to the server
 * - Shows success/error toast based on response
 */
export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordFields) => {
      const result = await changePasswordAction({
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
        confirmNewPassword: payload.confirmNewPassword,
      });

      handleResult(result, "Password changed successfully.");
      return result;
    },
  });
}

/**
 * Mutation to delete the user account
 * Steps after success:
 * 1. Clear React Query cache
 * 2. Sign out the user from NextAuth
 * 3. Redirect to login page
 */
/**
 * Mutation to upload profile photo
 * - Sends file via uploadProfilePhotoAction (FormData to API)
 * - Invalidates profile query on success
 */
export function useUploadProfilePhotoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set("photo", file);
      const result = await uploadProfilePhotoAction(formData);
      handleResult(result, "Photo updated successfully.");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const result = await deleteAccountAction();
      handleResult(result, "Account deleted.");
      return result;
    },

    onSuccess: async () => {
      // Clear all cached queries
      await queryClient.clear();

      // Sign out user session
      await signOut({ redirect: false });

      // Redirect to login
      router.push("/login");

      // Force full reload to ensure session cleanup
      window.location.href = "/login";
    },
  });
}