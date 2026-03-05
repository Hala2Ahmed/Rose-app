"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NumberInput } from "@/components/ui/input-number";
import { FileInput } from "@/components/ui/input-file";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  productSchema,
  updateProductSchema,
} from "@/lib/schemes/products.schema";
import {
  ProductFormData,
  ProductFormProps,
  ProductFormValues,
  UpdateProductFormData,
} from "@/lib/types/products-dashboard";
import { LucideImage } from "lucide-react";

export default function ProductForm({
  mode,
  defaultValues,
  onSubmit,
  isPending,
  occasions,
  categories,
}: ProductFormProps) {
  //translations
  const t = useTranslations("dashboard.products-form");

  const schema = mode === "add" ? productSchema(t) : updateProductSchema(t);

  //form
  const form = useForm<ProductFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const price = form.watch("price");
  const discount = form.watch("discount");

  React.useEffect(() => {
    const calculated =
      Number(price || 0) - (Number(price || 0) * Number(discount || 0)) / 100;
    form.setValue("priceAfterDiscount", calculated > 0 ? calculated : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, discount]);

  const handleSubmit: SubmitHandler<ProductFormValues> = (values) => {
    if (mode === "add") {
      (onSubmit as (values: ProductFormData) => void)(
        values as ProductFormData,
      );
    } else {
      (onSubmit as (values: UpdateProductFormData) => void)(
        values as UpdateProductFormData,
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-[62.5rem] space-y-4 grid grid-cols-3 gap-x-2.5 rounded-2xl bg-white px-7 py-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>
                {t("title-field")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("title-field-placeholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>
                {t("description-field")}{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("description-field-placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("price-field")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <NumberInput
                  {...field}
                  placeholder={t("price-field-placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("discount-field")}</FormLabel>
              <FormControl>
                <NumberInput
                  {...field}
                  placeholder={t("discount-field-placeholder")}
                  disabled={mode === "edit"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price After Discount */}
        <FormField
          control={form.control}
          name="priceAfterDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("price-after-discount-field")}</FormLabel>
              <FormControl>
                <NumberInput
                  readOnly
                  disabled
                  {...field}
                  placeholder={t("price-after-discount-field-placeholder")}
                  value={field.value || undefined}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>
                {t("quantity-field")}{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <NumberInput
                  {...field}
                  placeholder={t("quantity-field-placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images (Add only) */}
        {mode === "add" && (
          <>
            <FormField
              control={form.control}
              name="imgCover"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>
                    {t("product-cover-field")}{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileInput
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || null)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>
                    {t("product-gallery-field")}{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileInput
                      multiple
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? Array.from(e.target.files) : [],
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Category Select */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>
                {t("category-field")}{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="[&>span]:data-[placeholder]:text-zinc-500">
                    <SelectValue placeholder={t("select-field")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occasion Select */}
        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>
                {t("occasion-field")}{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={mode === "edit"}
                >
                  <SelectTrigger className="[&>span]:data-[placeholder]:text-zinc-500">
                    <SelectValue placeholder={t("select-field")} />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion._id} value={occasion._id}>
                        {occasion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images Button (Only for edit mode) */}
        <div className="col-span-3 pt-4 flex gap-2.5 justify-end items-end">
          {mode === "edit" && (
            <div className="flex gap-2.5">
              <Button
                type="button"
                className="flex border text-blue-600 border-[#00000014]"
                variant={"link"}
              >
                <LucideImage />
                {t("view-product-cover-btn")}
              </Button>

              <Button
                type="button"
                className="flex border text-blue-600 border-[#00000014]"
                variant={"link"}
              >
                <LucideImage />
                {t("view-product-gallery-btn")}
              </Button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-3 pt-28">
          <Button
            type="submit"
            loading={isPending}
            disabled={
              isPending ||
              (!form.formState.isValid && form.formState.isSubmitted)
            }
            className="w-full"
          >
            {mode === "add" ? t("add-product-btn") : t("update-product-btn")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
