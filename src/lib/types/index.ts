import { CancelledError } from "@tanstack/react-query";

export interface IBenefitsSection {
    title: string;
    description: string;
    icon: React.ReactNode;
};

export interface IOccasionsSection {
    image: string;
    badge?: string;
    description?: string;
    title: string;
};

export interface IOccasionCardProps {
    occasion: IOccasionsSection,
    height: number,
    children?: React.ReactNode
}

export type Orders = {
    orderNumber: string,
    createdAt: string,
    totalPrice: number,
    paymentMethod: string,
    status: "done"| "in progress"| "canceled",
    paid: "cash" | "credit card";
    data: OrderItem[],
}
export type OrderItem = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    rating: number;
    reviews: number;
};


