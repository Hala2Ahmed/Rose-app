import { z } from "zod";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 6;

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(MIN_NAME_LENGTH, `First name must be at least ${MIN_NAME_LENGTH} characters`)
    .max(MAX_NAME_LENGTH, `First name must be at most ${MAX_NAME_LENGTH} characters`)
    .trim(),
  lastName: z
    .string()
    .min(MIN_NAME_LENGTH, `Last name must be at least ${MIN_NAME_LENGTH} characters`)
    .max(MAX_NAME_LENGTH, `Last name must be at most ${MAX_NAME_LENGTH} characters`)
    .trim(),
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  phone: z.string().min(1, "Phone is required").trim(),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
    invalid_type_error: "Gender must be male, female, or other",
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `New password must be at least ${MIN_PASSWORD_LENGTH} characters`),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ProfileUpdateFields = z.infer<typeof profileUpdateSchema>;
export type ChangePasswordFields = z.infer<typeof changePasswordSchema>;
