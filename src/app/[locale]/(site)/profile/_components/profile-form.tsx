"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/lib/schemes/auth.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { UpdateProfileFields } from "@/lib/types/auth";
import { PhoneInput } from "@/components/ui/phone-input";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUpdateProfile from "../_hooks/use-update-profile";
import SubmissionError from "@/components/shared/submission-error";
import useDeleteAccount from "../_hooks/use-delete-profile";
import UpdatePhoto from "./update-photo";
import useGetProfileData from "../_hooks/use-get-user-data";
import { ProfileFormSkeleton } from "@/components/skeletons/profile-form.skeleton";
import { useSession } from "next-auth/react";

const defaultFormValues: UpdateProfileFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function ProfileForm() {
  //state
  const [errorMessage, setErrorMessage] = useState("");

  //translations
  const t = useTranslations("auth");

  //hooks
  const { updateProfile, isPending } = useUpdateProfile();
  const {
    deleteAccount,
    deleteErrorMessage,
    isPending: isDeleting,
    clearError,
  } = useDeleteAccount();
  const { profileData, refetch, isLoading, error } = useGetProfileData();

  const { data, update } = useSession();

  //form
  const form = useForm({
    resolver: zodResolver(updateProfileSchema(t)),
    defaultValues: defaultFormValues,
  });

  //effect
  useEffect(() => {
    if (!profileData?.user) return;

    form.reset({
      firstName: profileData?.user.firstName || "",
      lastName: profileData?.user.lastName || "",
      email: profileData?.user.email || "",
      phone: profileData?.user.phone || "",
      gender: profileData?.user.gender,
    });
  }, [profileData?.user, form]);

  const onSubmit: SubmitHandler<UpdateProfileFields> = (values) => {
    updateProfile(values, {
      onError: (error) => {
        setErrorMessage(error.message);
      },
      onSuccess: async () => {
        setErrorMessage("");
        await refetch();

        //to update values on dropdown menu header
        await update({
          user: {
            ...data?.user,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
          },
        });
      },
    });
  };

  //Loading state
  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  //error state
  if (error) {
    return <SubmissionError errorMessage={error.message} />;
  }

  return (
    <Form {...form}>
      <form
        className=" grid grid-cols-2 gap-x-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        {/* Profile Photo */}
        <UpdatePhoto />

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
          disabled
          render={({ field }) => (
            <FormItem className="mt-4 col-span-2" aria-disabled>
              {/* Label */}
              <FormLabel>{t("gender-label")}</FormLabel>

              {/* Input */}
              <FormControl>
                <Select disabled value={field.value || ""}>
                  <SelectTrigger status="disabled">
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

        {/* Submisson Error */}
        {errorMessage && (
          <SubmissionError
            className="col-span-2 h-20"
            errorMessage={errorMessage}
          />
        )}

        {/* Submission Button */}
        <div className="form-buttons flex justify-between col-span-2 mt-20">
          <DeleteConfirmation
            cancelButtonText={t("cancel-button")}
            confirmButtonText={t("confirm-button")}
            deleteContent={t("delete-confirm")}
            deleteFn={deleteAccount}
            error={deleteErrorMessage}
            deleteTitle={t("delete-account")}
            deleteSubtitle={t("delete-subtitle")}
            isDeleting={isDeleting}
            onOpenChange={(open) => {
              if (!open) clearError();
            }}
          />
          <Button
            disabled={form.formState.isSubmitting || isPending}
            type="submit"
            className="w-56">
            {t("save-changes")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
