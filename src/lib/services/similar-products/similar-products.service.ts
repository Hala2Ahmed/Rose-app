import { Products } from "@/lib/types/products.js";

export async function getSimilarProductService(categoryId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/products?category=${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data: ApiResponse<Products> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}
