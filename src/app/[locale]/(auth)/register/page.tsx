import React from "react";
import GreetingTitle from "../_components/greeting-title";
import FormFooter from "../_components/form-footer";
import FormInputs from "./register-form";

export default function RegisterPage() {
  return (
    <div>
      <GreetingTitle title="welcome back !" className="text-center" />
      <FormInputs />
      <FormFooter
        link="create new one"
        text="don't have an account ?"
        linkHref="/login"
      />
    </div>
  );
}
