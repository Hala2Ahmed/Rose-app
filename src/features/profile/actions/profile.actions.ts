"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  updateProfileApi,
  changePasswordApi,
  deleteAccountApi,
} from "@/lib/services/profile.api";
import {
  profileUpdateSchema,
  changePasswordSchema,
} from "@/lib/schemes/profile.schema";
import type {
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "@/lib/types/profile";

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };

export async function updateProfileAction(
  payload: UpdateProfilePayload,
): Promise<ActionResult<{ user: unknown }>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        error: "You must be signed in to update your profile.",
      };
    }

    const parsed = profileUpdateSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message =
        Object.values(first).flat().join(" ") || "Validation failed.";
      return { success: false, error: message };
    }

    const data = await updateProfileApi(session.accessToken, parsed.data);
    return { success: true, data, message: "Profile updated successfully." };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update profile.";
    return { success: false, error: message };
  }
}

export async function changePasswordAction(
  payload: ChangePasswordPayload & { confirmNewPassword: string },
): Promise<ActionResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        error: "You must be signed in to change your password.",
      };
    }

    const parsed = changePasswordSchema.safeParse({
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      confirmNewPassword: payload.confirmNewPassword,
    });
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message =
        Object.values(first).flat().join(" ") || "Validation failed.";
      return { success: false, error: message };
    }

    await changePasswordApi(session.accessToken, {
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    });
    return { success: true, message: "Password changed successfully." };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to change password.";
    return { success: false, error: message };
  }
}

export async function deleteAccountAction(): Promise<ActionResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        error: "You must be signed in to delete your account.",
      };
    }

    await deleteAccountApi(session.accessToken);
    return { success: true, message: "Account deleted." };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete account.";
    return { success: false, error: message };
  }
}

export async function uploadProfilePhotoAction(
  formData: FormData,
): Promise<ActionResult<{ photo?: string }>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        error: "You must be signed in to upload a photo.",
      };
    }

    const file = formData.get("photo") as File | null;
    if (!file?.size) {
      return { success: false, error: "No file provided." };
    }

    const res = await fetch(
      `${process.env.API_URL}/user/profile/photo`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      },
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: (data as { message?: string }).message ?? "Failed to upload photo.",
      };
    }

    return {
      success: true,
      data: { photo: (data as { user?: { photo?: string }; photo?: string }).user?.photo ?? (data as { photo?: string }).photo },
      message: "Photo updated successfully.",
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to upload photo.";
    return { success: false, error: message };
  }
}
