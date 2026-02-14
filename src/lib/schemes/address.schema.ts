import { Translations } from "../types/global";
import z from "zod";

// Schema for the address details step.
export const AddressSchema = (t: Translations) => z.object({
    street: z
        .string()
        .min(2, t("street_min")),

    phone: z
        .string()
        .regex(/^(?:\+20|20|0)1[0125][0-9]{8}$/, t("phone_invalid")),

    city: z
        .string()
        .min(1, t("city_min")),

    long: z
        .string()
        .refine((val) => !isNaN(Number(val)), t("long_invalid")),

    lat: z
        .string()
        .refine((val) => !isNaN(Number(val)), t("long_invalid"))
});