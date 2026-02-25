export enum TestimonialStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

export type Testimonial = {
    _id: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        photo: string,
    },
    rating: number,
    content: string,
    status: TestimonialStatus,
    featured: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export type Testimonials = {
    testimonials: Testimonial[]
}

