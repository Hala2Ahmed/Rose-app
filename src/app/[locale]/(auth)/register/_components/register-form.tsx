"use client";

import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RegisterFields } from "@/lib/types/auth.type";

import { PhoneInput } from "@/components/ui/phone-input";

import { registerSchema } from "@/lib/schemes/auth.schema";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { InputPassword } from "@/components/ui/input-password";

import useRegister from "../_hooks/use-register";

import SubmissionError from "@/components/shared/submission-error";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterForm() {
  //state
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  //translations
  const t = useTranslations("auth");

  //hooks
  const { register, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
  });

  //variables
  const formState = form.formState;

  //function
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    register(values, {
      onError: (error) => {
        const errorFieldMap = {
          email: "email",
          phone: "phone",
          firstName: "firstName",
          lastName: "lastName",
          password: "password",
        } as const;

        type ErrorKeyword = keyof typeof errorFieldMap;
        const matchedField = (
          Object.keys(errorFieldMap) as ErrorKeyword[]
        ).find((keyword) => error.message.toLowerCase().includes(keyword));

        //to set matched error to its adjacent input
        if (matchedField) {
          form.setError(
            errorFieldMap[matchedField],
            {
              type: "custom",
              message: error.message,
            },
            {
              shouldFocus: true,
            },
          );
        } else {
          setGeneralErrorMessage(error.message);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-6 grid grid-cols-2 gap-x-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>{t("firstname-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <Input {...field} placeholder="Sarah" />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>{t("lastname-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <Input {...field} placeholder="Hesham" />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2">
              {/* Label */}
              <FormLabel>{t("email-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <Input {...field} placeholder="User@example.com" />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2">
              {/* Label */}
              <FormLabel>{t("phone-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <PhoneInput
                  {...field}
                  placeholder={t("phone-placeholder")}
                  defaultCountry="EG"
                />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2">
              {/* Label */}
              <FormLabel>{t("gender-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="">
                    <SelectValue placeholder={t("gender-palceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("male-gender")}</SelectItem>
                    <SelectItem value="female">{t("female-gender")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2">
              {/* Label */}
              <FormLabel>{t("password-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <InputPassword
                  {...field}
                  type="password"
                  placeholder="********"
                />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2">
              {/* Label */}
              <FormLabel>{t("confirmpassword-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <InputPassword
                  {...field}
                  type="password"
                  placeholder="********"
                />
              </FormControl>

              {/* Error Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* General Submisson Error */}
        {generalErrorMessage && (
          <SubmissionError
            className="col-span-2 h-20"
            errorMessage={generalErrorMessage}
          />
        )}

        {/* Submission Button */}
        <Button
          disabled={isPending || formState.isSubmitting}
          className="w-full mt-10 col-span-2">
          {t("register.create-account")}
        </Button>
      </form>
    </Form>
  );
}
