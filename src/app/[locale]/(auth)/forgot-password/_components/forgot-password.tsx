"use client";

import React, { useState } from "react";
import EmailStep from "./email-step";
import ResetPasswordStep from "./reset-password-step";
import { ForgotPasswordSteps } from "@/lib/types/auth.type";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/global.constant";

export default function ForgotPassword() {
  //state
  const [step, setStep] = useState<ForgotPasswordSteps>(
    FORGOT_PASSWORD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string | null>(null);

  //varible
  const steps = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      form: <EmailStep setStep={setStep} setEmail={setEmail} email={email} />,
    },
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      form: <ResetPasswordStep email={email} />,
    },
  };

  return <div>{steps[step].form}</div>;
}
