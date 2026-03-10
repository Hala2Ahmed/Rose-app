import { z } from "zod";
import { Translations } from "../types/global";

export const addReviewSchema = (t: Translations) => z.object({
    title: z.string()
        .min(3, t("title-required"))
        .max(10, t('title-max-length')),
    comment: z.string()
        .min(1, t("comment-required")),
    rating: z.number()
        .min(1, t("rating-min-length"))
        .max(5, t('rating-max-length'))
    });
