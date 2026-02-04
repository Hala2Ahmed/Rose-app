"use client";

import { useQuery } from "@tanstack/react-query";
import { Reviews } from "@/lib/types/reviews";

export function useProductReviews(productId: string) {
    const { data: payload, isLoading } = useQuery({
        
        queryKey: ["product-reviews", productId],
        queryFn: async () => {
            const res = await fetch(`/api/get-reviews?productId=${productId}`);

            if (!res.ok) {
                throw new Error("Failed to fetch Exams");
            }
            const data: ApiResponse<PaginationData<Reviews>> = await res.json();

            if ("error" in data) {
                throw new Error(data.error);
            } return data;
        },
    });

    return { payload, isLoading };
}
