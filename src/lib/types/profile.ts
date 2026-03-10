/**
 * Profile feature types.
 * Aligned with next-auth Session user shape and API payloads.
 */

export interface ProfileUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  role: "user" | "admin";
  gender: "male" | "female" | "other";
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  photo?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
