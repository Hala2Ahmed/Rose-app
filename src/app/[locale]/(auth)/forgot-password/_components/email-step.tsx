"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailStepFields } from "@/lib/types/auth.type";
import { emailStepSchema } from "@/lib/schemes/auth.schema";
import useSendOtp from "../_hooks/use-send-otp";
import FormFooter from "../../_components/form-footer";
// import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/global.constant";
import { ErrorMessage } from "@/components/shared/forms-error-message";
import { OTP_COUNTDOWN_KEY, OTP_COUNTDOWN_TIME } from "@/lib/constants/auth.constant";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";

// interface EmailStepProps {
//   setStep: Dispatch<React.SetStateAction<ForgotPasswordSteps>>;
//   email: string | null;
//   setEmail: Dispatch<React.SetStateAction<string | null>>;
// }

export default function EmailStep(
  //   {
  //   setStep,
  //   email,
  //   setEmail,
  // }: EmailStepProps
) {
  //Translation
  const t = useTranslations("auth.forgot-password.email-step");

  //Mutation
  const { isPending, error, sendOtp } = useSendOtp();


  // Hooks 
  const {
    storedValue: otpCountdown,
    setValue,
  } = useLocalStorage(OTP_COUNTDOWN_KEY, null);

  //Form
  const form = useForm<EmailStepFields>({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(emailStepSchema(t)),
  });

  //function
  const onSubmit: SubmitHandler<EmailStepFields> = (values) => {
    if (otpCountdown) {
      // setStep(FORGOT_PASSWORD_STEPS.OTP);
      return;
    }

    sendOtp(values, {
      onSuccess: () => {
        const nextAllowedTime = new Date(Date.now() + OTP_COUNTDOWN_TIME);
        setValue(nextAllowedTime.toISOString());
        // store email in the state of the parent component
        // setEmail(values.email);

        // go to the next step
        // setStep(FORGOT_PASSWORD_STEPS.OTP);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* label */}
              <FormLabel>{t("label")}</FormLabel>
              {/* field */}
              <FormControl>
                <Input {...field} placeholder="user@example.com" />
              </FormControl>
              {/* feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {error && <ErrorMessage message={error.message} />}

        {/* Submit Button */}
        <div className="my-9">
          <Button
            type="submit"
            loading={isPending}
            disabled={
              isPending ||
              (!form.formState.isValid && form.formState.isSubmitted)
            }
            className="w-full"
          >
            {t("button")}
          </Button>
        </div>

        {/* Form Footer */}
        <FormFooter
          link={t("footer-link")}
          text={t("footer")}
          linkHref="/register"
        />
      </form>
    </Form>
  );
}
