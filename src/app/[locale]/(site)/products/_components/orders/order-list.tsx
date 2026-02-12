"use client"

import { Orders } from "@/lib/types";
import OrderItems from "./order-item";
import HeaderOrderItem from "./header-order-item";
import SummaryOrderItem from "./summary-order-item";
import { useTranslations } from "next-intl";

export default function OrderList({ items }: { items: Orders }) {
    const t = useTranslations("order");

    return (
        <>
            <li className="rounded-lg border bg-zinc-100 dark:bg-zinc-800">
                {/* Header */}
                <HeaderOrderItem order={items.orderNumber} date={items.createdAt} t={t}/>

                {/* Summary */}
                <SummaryOrderItem price={items.totalPrice} orderStatus={items.status} paid={items.paid} t={t}/>

                {/* all items */}
                <OrderItems data={items.data}/>
            </li>
        </>
    )
}



