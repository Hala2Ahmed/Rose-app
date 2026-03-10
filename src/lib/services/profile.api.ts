import { JSON_HEADER } from "@/lib/constants/api.constance";
import type {
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "@/lib/types/profile";

const getAuthHeaders = (accessToken: string) => ({
  ...JSON_HEADER,
  Authorization: `Bearer ${accessToken}`,
});

/**
 * Update user profile (API client).
 * PATCH /user/profile
 */
export async function updateProfileApi(
  accessToken: string,
  payload: UpdateProfilePayload,
) {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not configured.");

  const res = await fetch(`${baseUrl}/user/profile`, {
    method: "PATCH",
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { message?: string }).message ??
      (data as { error?: string }).error ??
      "Failed to update profile.";
    throw new Error(message);
  }

  return data as { user?: unknown };
}

/**
 * Change user password (API client).
 * PUT /user/profile/password
 */
export async function changePasswordApi(
  accessToken: string,
  payload: ChangePasswordPayload,
) {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not configured.");

  const res = await fetch(`${baseUrl}/user/profile/password`, {
    method: "PUT",
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify({
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { message?: string }).message ??
      (data as { error?: string }).error ??
      "Failed to change password.";
    throw new Error(message);
  }
}

/**
 * Delete user account (API client).
 * DELETE /user/account
 */
export async function deleteAccountApi(accessToken: string) {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not configured.");

  const res = await fetch(`${baseUrl}/user/account`, {
    method: "DELETE",
    headers: getAuthHeaders(accessToken),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { message?: string }).message ??
      (data as { error?: string }).error ??
      "Failed to delete account.";
    throw new Error(message);
  }
}
