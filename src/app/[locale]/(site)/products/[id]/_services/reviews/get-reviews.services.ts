import { Reviews } from "@/lib/types/reviews";

export async function getProductsReviewService(productId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/products/${productId}/reviews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["reviews"],
        },
    });

    const data: ApiResponse<PaginationData<Reviews>> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}