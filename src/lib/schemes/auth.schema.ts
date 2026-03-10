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

// Schema for the OTP step in forgot password flow.
export const otpStepSchema = (t: Translations) =>
  z.object({
    resetCode: z
      .string()
      .regex(/^\d*$/, t("otp-regex"))
      .length(6, t("otp-length")),
  });

export const updateProfileSchema = (t: Translations) =>
  z.object({
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
    gender: z
      .enum(["male", "female"], t("validations.gender-required"))
      .optional(),
  });

export const changePasswordSchema = (t: Translations) =>
  z
    .object({
      password: z.string().min(1, t("validations.current-password-required")),
      newPassword: z
        .string()
        .min(1, t("validations.new-password-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t("validations.password-pattern"),
        ),
      confirmNewPassword: z
        .string()
        .min(1, t("validations.confirm-new-password-required"))
        .optional(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: t("validations.confirm-new-password-error"),
    });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
export const photoUploadSchema = (t: (key: string) => string) =>
  z.object({
    photo: z
      .custom<FileList>()
      .refine(
        (files) => {
          if (!files || files.length === 0) return false;
          return files.length > 0;
        },
        {
          message: t("validations.photo-required"),
        },
      )
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;

          return files[0].size <= MAX_FILE_SIZE;
        },
        {
          message: t("validations.file-too-large"),
        },
      )
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;
          return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
        },
        {
          message: t("validations.invalid-file-type"),
        },
      ),
  });
