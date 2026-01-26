import { FORGOT_PASSWORD_STEPS } from "../constants/global.constant";
import {
  emailStepSchema,
  resetPasswordStepSchema,
} from "../schemes/auth.schema";

export type ForgotPasswordSteps =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

// Form fields for the email step
export type EmailStepFields = z.infer<ReturnType<typeof emailStepSchema>>;

// Response returned by the email step API
export type EmailStepResponse = {
  message: string;
  info: string;
};

// Form fields for the reset password step
export type ResetPasswordStepFields = z.infer<
  ReturnType<typeof resetPasswordStepSchema>
>;

// Response returned by the reset password step API
export type ResetPasswordStepResponse = {
  message: string;
  token: string;
};
