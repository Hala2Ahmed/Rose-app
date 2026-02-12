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
import { CloudUpload, X } from "lucide-react";
import { useState } from "react";
import useChangePhoto from "../_hooks/use-change-photo";
import { Button } from "@/components/ui/button";
import useGetProfileData from "../_hooks/use-get-user-data";
import { photoUploadSchema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdatePhoto() {
  //translations
  const t = useTranslations("auth");

  //form
  const form = useForm({
    resolver: zodResolver(photoUploadSchema(t)),
    mode: "onChange",
    defaultValues: {
      photo: undefined,
    },
  });

  //states
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //hooks
  const { profileData, refetch } = useGetProfileData();
  const { changePhoto, isPending } = useChangePhoto();

  //functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = async () => {
    const isValid = await form.trigger("photo");

    if (!isValid || !selectedFile) return;

    changePhoto(selectedFile, {
      onSuccess: async () => {
        // Refetch profile data to get the new photo URL
        await refetch();

        // Update session with the new photo
        if (profileData?.user?.photo) {
          form.setValue("photo", profileData.user.photo);
        }

        setSelectedFile(null);
        setPreview(null);
      },
      onError: () => {
        clearImage();
      },
    });
  };

  const clearImage = () => {
    setPreview(null);
    setSelectedFile(null);
    form.clearErrors();
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
                      <AvatarImage
                        src={preview || profileData?.user?.photo || ""}
                      />
                      <AvatarFallback className="text-3xl">
                        <Skeleton className="w-full h-full rounded-full" />
                      </AvatarFallback>
                    </Avatar>

                    {preview ? (
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute bottom-1 right-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md">
                        <X width={20} height={20} />
                      </button>
                    ) : (
                      <label className="absolute bottom-1 right-0 bg-zinc-50 hover:bg-zinc-100 rounded-full p-2 cursor-pointer transition-colors shadow-md">
                        <CloudUpload
                          width={20}
                          height={20}
                          className="dark:text-black"
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleFileChange(e);
                            onChange(e.target.files);
                            form.trigger("photo");
                          }}
                          {...field}
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-xl mb-4">
                      {t("upload")}
                    </h4>
                    <span className="text-zinc-500 text-base">
                      {t("photo-upload-hint")}
                    </span>
                  </div>
                </div>

                {/* Save Photo Button - Only shows when a file is selected */}
                {selectedFile && (
                  <Button
                    type="button"
                    onClick={handleSavePhoto}
                    disabled={isPending}
                    className="w-fit">
                    {isPending ? "Uploading..." : "Save Photo"}
                  </Button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
