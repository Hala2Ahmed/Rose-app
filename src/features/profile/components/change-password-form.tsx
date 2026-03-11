"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import { useChangePasswordMutation } from "@/hooks/use-profile-mutations";
import {
  changePasswordSchema,
  type ChangePasswordFields,
} from "@/lib/schemes/profile.schema";

export function ChangePasswordForm() {
  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isSubmitting = changePasswordMutation.isPending;

  function onSubmit(values: ChangePasswordFields) {
    changePasswordMutation.mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">
        Change Password
      </h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-4 md:p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="gap-1 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                  <FormLabel className="text-zinc-800 dark:text-zinc-200">
                    Old Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="Old Password"
                      status={
                        form.formState.errors.currentPassword
                          ? "error"
                          : "default"
                      }
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="gap-1">
                  <FormLabel className="text-zinc-800 dark:text-zinc-200">
                    New Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="New Password"
                      status={
                        form.formState.errors.newPassword ? "error" : "default"
                      }
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="gap-1">
                  <FormLabel className="text-zinc-800 dark:text-zinc-200">
                    Confirm New Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="Confirm New Password"
                      status={
                        form.formState.errors.confirmNewPassword
                          ? "error"
                          : "default"
                      }
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button */}
            <div className="flex justify-end pt-14">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-auto"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
