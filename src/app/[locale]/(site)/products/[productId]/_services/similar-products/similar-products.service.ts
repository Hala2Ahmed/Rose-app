import { getToken } from "@/lib/utils/manage-token";
import { Products } from "@/lib/types/products.js";

export async function getSimilarProductService(categoryId: string) {
    const token = await getToken();

    if (!token) {
        throw new Error("No token available")
    }

    const response = await fetch(`${process.env.API_URL!}/products?category=${categoryId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json"
        },
    });

    const data: ApiResponse<Products> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}
