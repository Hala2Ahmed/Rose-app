"use client";

import LoginForm from "./login-form";
import FormFooter from "../_components/form-footer";
import GreetingTitle from "../_components/greeting-title";
import AuthLanguageSwitcher from "../_components/auth-language-switcher";

export default function Page() {

    return (
        <>
            <AuthLanguageSwitcher />
            <GreetingTitle title="welcome back!" />
            <LoginForm />
            <FormFooter link="Create one now!" text="Don’t have an account yet? " linkHref="/register" />
        </>
    )
}