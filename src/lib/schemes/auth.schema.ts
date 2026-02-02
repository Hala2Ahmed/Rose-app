import z from "zod";
import { Translations } from "../types/global";
export const registerSchema = (t: Translations) =>
  z
    .object({
      firstName: z
        .string(t("validations.firstname-required"))
        .min(2, t("validations.firstname-min"))
        .max(20, t("validations.firstname-max")),
      lastName: z
        .string(t("validations.lastname-required"))
        .min(2, t("validations.lastname-min"))
        .max(20, t("validations.lastname-max")),
      email: z.email(t("validations.email-required")),
      phone: z
        .string()
        .regex(
          /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
          t("validations.phonenumber-valid"),
        ),
      gender: z.enum(["male", "female"], t("validations.gender-required")),
      password: z
        .string()
        .min(1, t("validations.password-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t("validations.password-pattern"),
        ),
      rePassword: z.string().min(1, t("validations.confirmpassword-required")),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: t("validations.confirmpassword-error"),
    });

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
