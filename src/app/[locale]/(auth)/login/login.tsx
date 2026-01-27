"use client";

import LoginForm from "./login-form";
import FormFooter from "../_components/form-footer";
import GreetingTitle from "../_components/greeting-title";
import AuthLanguageSwitcher from "../_components/auth-language-switcher";
import { useTranslations } from "next-intl";

export default function Login() {
    const t = useTranslations("auth.login");
    
    return (
        <>
            <AuthLanguageSwitcher />
            <GreetingTitle title={t("welcome")} />
            <LoginForm />
            <FormFooter link={t("create")} text={t("account")} linkHref="/register" />
        </>
    )
}