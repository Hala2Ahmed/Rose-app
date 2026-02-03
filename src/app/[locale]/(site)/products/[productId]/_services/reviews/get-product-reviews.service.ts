import { Reviews } from "@/lib/types/reviews.js";

export async function getProductsReviewService(productId: string) {
    const response = await fetch(`${process.env.API_URL!}/products/${productId}/reviews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data: ApiResponse<PaginationData<Reviews>> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}
