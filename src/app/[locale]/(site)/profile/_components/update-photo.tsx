"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";
import { useRef } from "react";
import useChangePhoto from "../_hooks/use-change-photo";
import useGetProfileData from "../_hooks/use-get-user-data";
import { photoUploadSchema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";

export default function UpdatePhoto() {
  //translations
  const t = useTranslations("auth");

  //refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  //form
  const form = useForm({
    resolver: zodResolver(photoUploadSchema(t)),
    mode: "onChange",
    defaultValues: {
      photo: undefined,
    },
  });

  //hooks
  const { profileData, refetch } = useGetProfileData();
  const { changePhoto, isPending } = useChangePhoto();

  //functions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate the file
    const isValid = await form.trigger("photo");
    if (!isValid) {
      // Reset input on validation failure
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Directly upload the photo to backend
    changePhoto(file, {
      onSuccess: async () => {
        // Refetch profile data to get the new photo URL
        await refetch();

        // Update session with the new photo
        if (profileData?.user?.photo) {
          form.setValue("photo", profileData.user.photo);
        }

        // Reset the file input to allow selecting the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: () => {
        // Clear the file input on error
        form.clearErrors();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="photo"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem className="col-span-2 mb-4">
            <FormControl>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="relative w-32 h-32">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={profileData?.user?.photo || ""} />
                      <AvatarFallback className="text-3xl">
                        <Skeleton className="w-full h-full rounded-full" />
                      </AvatarFallback>
                    </Avatar>

                    <label className="absolute bottom-1 right-0 bg-zinc-50 hover:bg-zinc-100 rounded-full p-2 cursor-pointer transition-colors shadow-md">
                      {isPending ? (
                        <LoaderIcon
                          width={20}
                          height={20}
                          className={"animate-spin"}
                        />
                      ) : (
                        <CloudUpload
                          width={20}
                          height={20}
                          className="dark:text-black"
                        />
                      )}
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isPending}
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleFileChange(e);
                        }}
                        {...field}
                      />
                    </label>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-xl mb-4">
                      {t("upload")}
                    </h4>
                    <span className="text-zinc-500 text-base">
                      {isPending
                        ? t("upload-photo-pending")
                        : t("photo-upload-hint")}
                    </span>
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
