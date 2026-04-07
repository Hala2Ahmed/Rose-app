import { z } from "zod";
import { Translations } from "../types/global";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = (t: Translations) =>
  z.object({
    title: z
      .string()
      .min(1, t("product-title-required"))
      .min(2, t("title-min-length"))
      .max(100, t("title-max-length")),
    description: z
      .string()
      .min(1, t("product-description-required"))
      .min(10, t("description-min-length"))
      .max(2000, t("description-max-length")),
    price: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z
        .number({ message: t("price-required") })
        .positive(t("price-required"))
        .max(999999, t("price-too-high")),
    ),
    discount: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z
        .number()
        .min(0, t("discount-negative"))
        .max(100, t("discount-max"))
        .optional(),
    ),

    priceAfterDiscount: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(0, t("discount-negative")).optional(),
    ),
    quantity: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z
        .number({ message: t("quantity-required") })
        .int(t("quantity-integer"))
        .min(1, t("quantity-required"))
        .max(999999, t("quantity-too-high")),
    ),
    category: z.string().min(1, t("category-required")),
    occasion: z.string().min(1, t("occasion-required")),
    imgCover: z
      .any()
      .refine((file) => file instanceof File, t("product-cover-required"))
      .refine(
        (file) => file && file.size <= MAX_FILE_SIZE,
        t("file-size-limit"),
      )
      .refine(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        t("invalid-file-type"),
      ),

    images: z
      .any()
      .refine(
        (files) => Array.isArray(files) && files.length > 0,
        t("product-gallery-required"),
      )
      .refine(
        (files) =>
          Array.isArray(files) &&
          files.every((file) => file.size <= MAX_FILE_SIZE),
        t("each-image-size-limit"),
      )
      .refine(
        (files) =>
          Array.isArray(files) &&
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        t("invalid-file-type"),
      ),
  });

export const updateProductSchema = (t: Translations) =>
  productSchema(t).omit({ imgCover: true, images: true });
