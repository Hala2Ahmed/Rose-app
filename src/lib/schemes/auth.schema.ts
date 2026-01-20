import z from "zod/v3";
import { Translations } from "../types/global";

// Schema for the email step in forgot password flow.
export const emailStepSchema = (t: Translations) =>
  z.object({
    email: z.string().nonempty(t("email-required")).email(t("email-validate")),
  });

// Schema for the reset password step.
export const resetPasswordStepSchema = (t: Translations) =>
  z
    .object({
      newPassword: z
        .string()
        .nonempty(t("password-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t("password-password-pattern"),
        ),
      reNewPassword: z.string().nonempty(t("password-required")),
    })
    .refine((data) => data.newPassword === data.reNewPassword, {
      message: t("re-password-mismatch"),
      path: ["reNewPassword"],
    });
