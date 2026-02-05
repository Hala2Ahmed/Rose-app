import z from 'zod';
import { otpStepSchema } from '../schemes/auth.schema';
import { FORGOT_PASSWORD_STEPS } from '../constants/auth.constant';

export type OtpStepFields = z.infer<ReturnType<typeof otpStepSchema>>;

export type OTPStepResponse = {
    status: string;
};

type ForgotPasswordStep =
    (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];