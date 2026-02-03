import { useMutation } from "@tanstack/react-query";
import { AddReviewFields } from "@/lib/types/reviews";
import { AddReviewAction } from "../../_actions/reviews/add-review.action";

type AddReview = {
    product: string;
    fields: AddReviewFields;
}

export default function useAddReview() {
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
    });

    return { isPending, error, addReview: mutate };
}