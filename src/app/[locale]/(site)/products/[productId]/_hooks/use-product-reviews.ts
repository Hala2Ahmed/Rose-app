"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsReviewService } from "../_services/get-product-reviews.service";

export function useProductReviews(productId: string) {
    const { isLoading,
        data: payload
    } = useQuery({
        queryKey: ["product-reviews", productId],
        queryFn: () => getProductsReviewService(productId),
        enabled: !!productId,
    });

    return { isLoading, payload };
}
