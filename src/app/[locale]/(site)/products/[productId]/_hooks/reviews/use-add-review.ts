"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddReviewFields, Reviews } from "@/lib/types/reviews";
import { AddReviewAction } from "../../_actions/reviews/add-review.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type AddReview = {
    product: string;
    fields: AddReviewFields;
}

export default function useAddReview() {
    //Translation
    const t = useTranslations("review");

    // query client
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: async ({
            product,
            fields,
        }: AddReview) => {
            const response = await AddReviewAction({ product, reset: fields });

            {/* Error */ }
            if ("error" in response) {
                throw new Error(response?.error || "Something went wrong. Please try again.");
            }

            {/* Success */ }
            return response;
        },
        onSuccess: (response, variables) => {

            queryClient.setQueryData<Reviews>(["product-reviews", variables.product], (old) => {
                if (!old) return old;

                const newReview = response.review ?? response;

                return {
                    ...old,
                    reviews: [newReview, ...old.reviews],
                };
            });
            toast.success(t("success-add-review"))
        }
    });

    return { isPending, error, addReview: mutate };
}