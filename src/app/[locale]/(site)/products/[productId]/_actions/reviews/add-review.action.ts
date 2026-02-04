"use server";

import { AddReview, AddReviewFields } from "@/lib/types/reviews";
import { getToken } from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";

export async function AddReviewAction(fields: {
    product: string;
    reset: AddReviewFields;
}) {
    const token = await getToken();

    if (!token) {
        throw new Error("No token available")
    }
    // Send PUT request to reset password endpoint
    const response = await fetch(`${process.env.API_URL}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            product: fields.product,
            comment: fields.reset.comment,
            title: fields.reset.title,
            rating: fields.reset.rating,
        }),
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json"
        },
    });

    const payload: ApiResponse<AddReview> = await response.json();

    revalidateTag("reviews");

    return payload;
}
