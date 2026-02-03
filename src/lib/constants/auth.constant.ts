export const FORGOT_PASSWORD_STEPS = {
    EMAIL: "email",
    OTP: "otp",
    NEW_PASSWORD: "new-password"
} as const;

export const OTP_COUNTDOWN_KEY = "otp-countdown";
export const OTP_COUNTDOWN_TIME = 60000;