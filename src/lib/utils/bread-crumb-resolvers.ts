import { getOccasionById } from "@/lib/api/get-occasion-by-id";

export type EntityResolver = (id: string) => Promise<string | null>;

export const breadcrumbResolvers: Record<string, EntityResolver> = {
  occasions: async (id) => {
    const result = await getOccasionById(id);
    if (!result || "error" in result || !result.data) return null;
    return result.data.occasion.name ?? null;
  },
};
