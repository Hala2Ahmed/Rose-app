"use client";

import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  defaultEmail?: string;
};

export default function LoginForm({ defaultEmail = "" }: LoginFormProps) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: defaultEmail,
      password: "",
      rememberMe: false,
    },
  });

  /* to do */
  // const handleSubmit: SubmitHandler = async (values) => {
  // };

  return (
    <section>
      <h2>Login</h2>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}> */}
      {/* Remember Me Checkbox */}
      {/* <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal cursor-pointer">
                  Remember Me
                </FormLabel>
              </FormItem>
            )}
          /> */}
      {/* </form>
      </Form> */}
    </section>
  );
}
