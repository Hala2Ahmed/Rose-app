import { CategoriesResponse } from "../types/categories";
import { fetchCategories } from "./fetch-category";

type CategoryResult =
  | { success: true; data: CategoriesResponse }
  | { success: false; error: string; data: null };

export async function getAllCategories({
  limit = 10,
  page = 1,
  query = "",
} = {}): Promise<CategoryResult> {
  try {
    const data = await fetchCategories({ limit, page, query });
    return { success: true, data };
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories", data: null };
  }
}
