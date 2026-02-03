import z from "zod";
import { Translations } from "../types/global";
export const priceFilterSchema = (t: Translations) =>
  z
    .object({
      priceFrom: z.coerce
        .number(t("price-valid"))
        .optional()
        .pipe(
          z
            .number()
            .min(1, t("price-valid"))
            .max(1000, t("price-from-max"))
            .optional(),
        ),
      priceTo: z.coerce
        .number(t("price-valid"))
        .optional()
        .pipe(
          z
            .number()
            .min(5, t("price-valid"))
            .max(10000, t("price-to-max"))
            .optional(),
        ),
    })
    .refine(
      (data) => {
        if (!data.priceFrom || !data.priceTo) return true;
        return data.priceFrom < data.priceTo;
      },
      {
        message: t("price-from-less-than-to"),
        path: ["priceFrom"],
      },
    );
