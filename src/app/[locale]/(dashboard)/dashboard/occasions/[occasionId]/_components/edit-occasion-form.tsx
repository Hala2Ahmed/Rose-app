"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { occasionSchema } from "@/lib/schemes/dashboard.schema";
import useUpdateOccasion from "../../_hooks/use-update-occasion";
import SubmissionError from "@/components/shared/submission-error";
import { useEffect } from "react";
import useGetSingleOccasion from "../../_hooks/use-get-occasion-by-id";
import { useParams } from "next/navigation";
import { OccasionFields } from "@/lib/types/occasions.types";
import { LucideImage } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditOccasionForm() {
  //translations
  const t = useTranslations("dashboard.occasions");

  //navigation
  const { occasionId } = useParams();

  //hook
  const { occasion, isLoading } = useGetSingleOccasion(occasionId);

  const form = useForm({
    resolver: zodResolver(occasionSchema(t)),
  });

  const { updateOccasion, isPending, error } = useUpdateOccasion(occasionId);

  const onSubmit: SubmitHandler<OccasionFields> = (values) => {
    updateOccasion(values);
  };

  //effect for set name properly
  useEffect(() => {
    if (occasion?.occasion) {
      form.reset({
        name: occasion.occasion.name,
      });
    }
  }, [occasion, form]);
  return (
    <div className="ms-6">
      <h1 className="font-semibold text-2xl text-zinc-800 mb-6 flex gap-2">
        {t("update-occasion")}
        {isLoading ? (
          <Skeleton className=" w-[10rem] mt-2" />
        ) : (
          <span> {occasion?.occasion.name}</span>
        )}
      </h1>
      <div className="max-w-[67.563rem] rounded-2xl p-6">
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
                    <div className="relative">
                      {isLoading && (
                        <Skeleton className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-32 z-10" />
                      )}
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder={isLoading ? "" : t("occasion-name")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* View Image Placeholder button */}
            <Button
              type="button"
              className="text-blue-600 border-[#00000014] border ms-auto flex"
              variant={"link"}>
              <LucideImage />
              {t("view-image")}
            </Button>

            {/* Error message from backend */}
            {error && <SubmissionError errorMessage={error.message} />}

            {/* Submission Button */}
            <Button disabled={isPending} className="w-full mt-32">
              {isPending ? t("editing") : t("edit-occasions")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
