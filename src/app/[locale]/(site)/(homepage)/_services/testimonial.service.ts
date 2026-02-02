// import { Testimonials } from "../../../../lib/types/testimonials";

import { Testimonials } from "@/lib/types/testimonials";

const BASE_AUTH_URL = `${process.env.API_URL!}/testimonials`;

export async function getTestimonialsService() {
    const response = await fetch(`${BASE_AUTH_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data: ApiResponse<PaginationData<Testimonials>> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data;
}
