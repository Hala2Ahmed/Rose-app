import { CategoriesResponse } from "@/lib/types/categories";

type FetchCategoriesParams = {
  page: number;
  limit: number;
};

export async function allCategoriesService({
  page,
  limit,
}: FetchCategoriesParams): Promise<CategoriesResponse> {
  const res = await fetch(
    `/api/categories?page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}