import React from "react";

import GreetingTitle from "../_components/greeting-title";

import FormFooter from "../_components/form-footer";

import RegisterForm from "./_components/register-form";

import { useTranslations } from "next-intl";

export default function RegisterPage() {
  //translations
  const t = useTranslations("auth.register");

  return (
    <div>
      {/* Form Header */}
      <GreetingTitle title={t("greeting-title")} className="text-center" />

      {/* RegisterForm */}
      <RegisterForm />

      {/* Form Footer */}
      <FormFooter
        link={t("form-footer-link")}
        text={t("form-footer")}
        linkHref="/login"
      />
    </div>
  );
}
