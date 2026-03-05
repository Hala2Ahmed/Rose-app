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
import { LucideImage, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { occasionSchema } from "@/lib/schemes/dashboard.schema";
import SubmissionError from "@/components/shared/submission-error";
import { Skeleton } from "@/components/ui/skeleton";
import { OccasionFields } from "@/lib/types/occasions.types";
import useAddOccasion from "../_hooks/use-add-occasion";
import useUpdateOccasion from "../_hooks/use-update-occasion";
import useGetSingleOccasion from "../_hooks/use-get-occasion-by-id";

interface OccasionFormProps {
  occasionId?: string | string[];
}

export default function OccasionForm({ occasionId }: OccasionFormProps) {
  //translations
  const t = useTranslations("dashboard.occasions");

  const isEditMode = !!occasionId;

  const [fileName, setFileName] = useState<string | null>(null);

  //hooks
  const { occasion, isLoading } = useGetSingleOccasion(
    isEditMode ? occasionId : undefined,
  );

  const form = useForm<OccasionFields>({
    resolver: zodResolver(occasionSchema(t)),
  });

  const {
    addOccasion,
    isPending: isAdding,
    error: addError,
  } = useAddOccasion();

  const {
    updateOccasion,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateOccasion(occasionId!);

  //variables
  const isPending = isAdding || isUpdating;
  const error = addError || updateError;

  //effect
  useEffect(() => {
    if (isEditMode && occasion?.occasion) {
      form.reset({ name: occasion.occasion.name });
    }
  }, [occasion, form, isEditMode]);

  const onSubmit: SubmitHandler<OccasionFields> = (values) => {
    if (isEditMode) {
      updateOccasion(values);
    } else {
      const formData = new FormData();
      formData.append("name", values.name);
      const file = values.image?.[0];
      if (file) formData.append("image", file);
      addOccasion(formData);
    }
  };

  return (
    <div className="max-w-[67.563rem] bg-white rounded-2xl">
      <Form {...form}>
        <form className="w-[746px] p-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="font-medium mb-5">
                <FormLabel>
                  {t("name-label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    {isEditMode && isLoading && (
                      <Skeleton className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-32 z-10" />
                    )}
                    <Input
                      {...field}
                      disabled={isEditMode && isLoading}
                      placeholder={
                        isEditMode && isLoading ? "" : t("occasion-name")
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Field — only shown in add mode */}
          {!isEditMode && (
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
                        <span className="text-sm text-gray-500 truncate max-w-[70%]">
                          {fileName ?? ""}
                        </span>
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
          )}

          {/* View image button — only shown in edit mode */}
          {isEditMode && (
            <Button
              type="button"
              className="text-blue-600 border-[#00000014] border ms-auto flex"
              variant="link">
              <LucideImage />
              {t("view-image")}
            </Button>
          )}

          {/* Backend error */}
          {error && <SubmissionError errorMessage={error.message} />}

          {/* Submit */}
          <Button disabled={isPending} className="w-full mt-32">
            {isEditMode
              ? isPending
                ? t("editing")
                : t("edit-occasions")
              : isPending
                ? t("adding")
                : t("add-occasions")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
