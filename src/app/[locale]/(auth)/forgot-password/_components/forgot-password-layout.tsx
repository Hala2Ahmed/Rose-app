"use client";
import React, { useState } from "react";
import { ForgotPasswordSteps } from "@/lib/types/auth.type";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import EmailStep from "./email-step";
import VerifyOtpStep from "./otp-step";
import ResetPasswordStep from "./reset-password-step";
import { useTranslations } from "next-intl";

export default function ForgotPasswordLayout() {
  /* Translation hook */
  const t = useTranslations("auth.forgot-password.reset-password-step");
  /* Controls which step is currently visible */
  const [step, setStep] = useState<ForgotPasswordSteps>(
    FORGOT_PASSWORD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string | null>(null);

  /* Central configuration for each forgot-password step */
  const steps = {
    /* Step 1: Email Input */
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("forgot-password-title"),
      description: t("forgotPassword-description"),
      form: <EmailStep email={email} setStep={setStep} setEmail={setEmail} />,
    },

    /* Step 2: OTP Verification */
    [FORGOT_PASSWORD_STEPS.OTP]: {
      title: t("otp-title"),
      description: t.rich("otp-description", {
        email: email || "",
        span: (chunk: React.ReactNode) => (
          <span className="font-medium">{chunk}</span>
        ),
        button: (chunk: React.ReactNode) => (
          <button
            className="text-blue-700 underline dark:text-blue-400"
            onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
          >
            {chunk}
          </button>
        ),
      }),
      form: <VerifyOtpStep email={email} setStep={setStep} />,
    },

    /* Step 3: New Password Creation */
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("new-password-title"),
      description: t("new-password-description"),
      form: <ResetPasswordStep email={email} />,
    },
  };

  return (
    <>
      <div className="text-zinc-800 dark:text-zinc-50">
        {/* title */}
        <h1 className="text-2xl font-semibold">{steps[step].title}</h1>

        {/* description */}
        <p>{steps[step].description}</p>
      </div>

      {/* step form */}
      <div>{steps[step].form}</div>
    </>
  );
}
