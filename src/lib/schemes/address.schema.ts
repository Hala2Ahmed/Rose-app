import { Translations } from "../types/global";
import z from "zod";

// Schema for the address details step.
export const AddressSchema = (t: Translations) => z.object({
    street: z
        .string()
        .min(2, t("street_min")),

    phone: z
        .string(),
        // .regex(/^01[0-9]{9}$/, t("phone_invalid")),

    city: z
        .string()
        .min(1, t("city_min")),

    username: z
        .string()
        .min(3, t("username_min"))
        .max(20, t("username_max")),
            lat: z
        .string()
        .refine((val) => !isNaN(Number(val)), t("lat_invalid")),

    long: z
        .string()
        .refine((val) => !isNaN(Number(val)), t("long_invalid")),
});