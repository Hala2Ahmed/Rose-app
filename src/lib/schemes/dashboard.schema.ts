import z from "zod";
import { Translations } from "../types/global";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
export const occasionSchema = (t: Translations) =>
  z.object({
    name: z
      .string(t("validations.occasions-required"))
      .min(2, t("validations.occasions-min"))
      .max(20, t("validations.occasions-max")),
    image: z
      .custom<FileList>()
      .optional()
      .refine(
        (files) => {
          if (!files || files.length === 0) return false;
          return files.length > 0;
        },
        {
          message: t("validations.photo-required"),
        },
      )
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;

          return files[0].size <= MAX_FILE_SIZE;
        },
        {
          message: t("validations.file-too-large"),
        },
      )
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;
          return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
        },
        {
          message: t("validations.invalid-file-type"),
        },
      ),
  });
