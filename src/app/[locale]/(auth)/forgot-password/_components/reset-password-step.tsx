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
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useResetPassword from "../_hooks/use-reset-password";
import { useTranslations } from "next-intl";
import { resetPasswordStepSchema } from "@/lib/schemes/auth.schema";
import FormFooter from "../../_components/form-footer";
import { InputPassword } from "@/components/ui/input-password";
import { ErrorMessage } from "@/components/shared/forms-error-message";
import { ResetPasswordStepFields } from "@/lib/types/auth.type";

// interface NewPasswordProps {
//   email: string | null;
// }

export default function ResetPasswordStep(
  // { email }: NewPasswordProps
) {
  // Translation
  const t = useTranslations("auth.forgot-password.reset-password-step");

  //Mutation
  const { isPending, error, resetPassword } = useResetPassword();

  //Form
  const form = useForm<ResetPasswordStepFields>({
    defaultValues: {
      newPassword: "",
      reNewPassword: "",
    },
    resolver: zodResolver(resetPasswordStepSchema(t)),
  });

  //Function
  const onSubmit: SubmitHandler<ResetPasswordStepFields> = (values) => {
    if (!email) return;
    resetPassword({
      ...values,
      email,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              {/* label */}
              <FormLabel>{t("password-label")}</FormLabel>
              {/* field */}
              <FormControl>
                <InputPassword {...field} placeholder="********" />
              </FormControl>
              {/* feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="reNewPassword"
          render={({ field }) => (
            <FormItem className="mt-4">
              {/* label */}
              <FormLabel>{t("re-password-label")}</FormLabel>
              {/* field */}
              <FormControl>
                <InputPassword {...field} placeholder="********" />
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
          linkHref="/contact"
        />
      </form>
    </Form>
  );
}
