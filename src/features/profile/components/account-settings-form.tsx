"use client";

import { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PhoneInput } from "@/components/ui/phone-input";

import {
  useUpdateProfileMutation,
  useUploadProfilePhotoMutation,
} from "@/hooks/use-profile-mutations";

import {
  profileUpdateSchema,
  type ProfileUpdateFields,
} from "@/lib/schemes/profile.schema";

import type { ProfileUser } from "@/lib/types/profile";

import { toast } from "sonner";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { Link } from "@/i18n/navigation";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

interface AccountSettingsFormProps {
  user: ProfileUser;
}

const GENDER_OPTIONS: {
  value: ProfileUpdateFields["gender"];
  label: string;
}[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const updateMutation = useUpdateProfileMutation();
  const uploadPhotoMutation = useUploadProfilePhotoMutation();

  const form = useForm<ProfileUpdateFields>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      gender: user.gender ?? "other",
    },
  });

  const isDirty = form.formState.isDirty;
  const isSubmitting = updateMutation.isPending;

  function onSubmit(values: ProfileUpdateFields) {
    updateMutation.mutate(values);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please choose a .jpg, .png, or .gif image.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }
    uploadPhotoMutation.mutate(file);
    e.target.value = "";
  }

  /** unified user image */
  const userImageSrc =
    user.photo?.startsWith("http")
      ? user.photo
      : `${process.env.NEXT_PUBLIC_IMAGE_API_URL ?? ""}/${user.photo}`;

  return (
    <div className="mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8">

{/* Profile Photo */}
<div className="flex items-center gap-4 mb-8">
  <div className="relative w-14 h-14 shrink-0">

    {/* Profile Image */}
    <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
      {user.photo ? (
        <Image
          src={userImageSrc}
          alt="Profile photo"
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm font-medium">
          {user.firstName?.[0] ?? "?"}
        </div>
      )}
    </div>

    {/* Hidden Input */}
    <input
      ref={photoInputRef}
      type="file"
      accept=".jpg,.jpeg,.png,.gif"
      className="hidden"
      onChange={handlePhotoChange}
    />

    {/* Upload Icon Button */}
    <button
      type="button"
      onClick={() => photoInputRef.current?.click()}
      disabled={uploadPhotoMutation.isPending}
      className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-600 transition"
      aria-label="Upload photo"
    >
      <CloudUpload className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-200" />
    </button>

  </div>

  <div>
    <p className="font-medium text-zinc-900 dark:text-zinc-300">
      Upload Photo
    </p>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      You can upload a .jpg, .png or .gif photo with max size of 5MB
    </p>
  </div>
</div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >

          {/* First / Last Name */}
          <div className="grid md:grid-cols-2 gap-4">

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="EG"
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {GENDER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">

            <div className="flex items-center gap-6">

              <DeleteAccountDialog />

              <Link
                href="/dashboard/products/change-password"
                className="text-sm text-zinc-700 dark:text-zinc-300 hover:underline"
              >
                Change Password
              </Link>

            </div>

            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
              variant="primary"
              loading={isSubmitting}
              className="w-auto"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

          </div>

        </form>
      </Form>
    </div>
  );
}