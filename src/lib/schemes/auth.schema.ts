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
        .string(t("validations.password-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
        ),
      rePassword: z.string().min(1, "please confirm your password"),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: t("validations.confirmpassword-error"),
    });
