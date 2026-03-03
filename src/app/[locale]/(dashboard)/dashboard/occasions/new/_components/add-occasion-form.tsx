"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { occasionSchema } from "@/lib/schemes/dashboard.schema";
import useAddOccasion from "../../_hooks/use-add-occasion";
import SubmissionError from "@/components/shared/submission-error";
import { OccasionFields } from "@/lib/types/occasions.types";

export default function AddOccasionForm() {
  const t = useTranslations("dashboard.occasions");
  const form = useForm({
    resolver: zodResolver(occasionSchema(t)),
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const { addOccasion, isPending, error } = useAddOccasion();

  const onSubmit: SubmitHandler<OccasionFields> = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    const file = values.image?.[0];
    if (file) {
      formData.append("image", file);
    }

    addOccasion(formData);
  };

  return (
    <div className="rounded-2xl p-6">
      <Form {...form}>
        <form className="w-[746px]" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="font-medium mb-5">
                <FormLabel>
                  {t("name-label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("occasion-name")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>
                  {t("occasion-image-label")}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => {
                        const files = e.target.files;
                        const file = files?.[0];
                        setFileName(file ? file.name : null);
                        onChange(files);
                      }}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="border rounded-xl px-4 h-11 flex items-center justify-between text-maroon-500">
                      {/* File name on the left */}
                      <span className="text-sm text-gray-500 truncate max-w-[70%] flex">
                        {fileName ?? ""}
                      </span>
                      {/* Upload button on the right */}
                      <div className="flex items-center">
                        <Upload width={18} height={18} />
                        <span className="ms-2">{t("upload")}</span>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error message from backend */}
          {error && <SubmissionError errorMessage={error.message} />}

          {/* Submission Button */}
          <Button disabled={isPending} className="w-full mt-32">
            {isPending ? t("adding") : t("add-occasions")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
