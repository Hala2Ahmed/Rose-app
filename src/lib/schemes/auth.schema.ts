import z from "zod";
import { Translations } from "../types/global";

export const otpStepSchema = (t: Translations) => z.object({
    resetCode: z
      .string()
      .regex(/^\d*$/, t("otp-regex"))
      .length(6, t("otp-length")),
});
