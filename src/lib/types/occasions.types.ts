import z from "zod";
import { occasionSchema } from "../schemes/dashboard.schema";
export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;

  productsCount: number;
};
export type OccasionResponse = {
  message: string;
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  occasions: Occasion[];
};

export type SingleOccasionResponse = {
  message: string;
  occasion: Occasion;
};

export type DeleteOccasionResponse = {
  message: string;
  document: Occasion;
};

export type AddOccasionResponse = {
  message: string;
  occasion: Occasion;
};

export type OccasionFields = z.infer<ReturnType<typeof occasionSchema>>;
