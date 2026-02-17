import z from "zod";
import {
  otpStepSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../schemes/auth.schema";
import { FORGOT_PASSWORD_STEPS } from "../constants/auth.constant";

export type OtpStepFields = z.infer<ReturnType<typeof otpStepSchema>>;
export type RegisterFields = z.infer<ReturnType<typeof registerSchema>>;

export type OTPStepResponse = {
  status: string;
};

type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type UpdateProfileFields = z.infer<
  ReturnType<typeof updateProfileSchema>
>;
export type ChangePasswordFields = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
