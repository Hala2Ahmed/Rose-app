import { SimilarProducts } from "@/lib/types/similar-products";
import { getToken } from "@/lib/utils/manage-token";

export async function getSimilarProductService(productId: string) {
    const token = await getToken();

    if (!token) {
        throw new Error("No token available")
    }

    const response = await fetch(`${process.env.API_URL!}/related/similar/${productId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json"
        },
    });

    const data: ApiResponse<SimilarProducts> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}
