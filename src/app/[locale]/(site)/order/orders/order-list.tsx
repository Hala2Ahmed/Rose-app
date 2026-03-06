// "use client"

import { Orders } from "@/lib/types";
import OrderItems from "./order-item";
import { useTranslations } from "next-intl";
import HeaderOrderItem from "./header-order-item";
import SummaryOrderItem from "./summary-order-item";
import { fakeData } from "@/lib/constants/homepage.constant";


export default function OrderList({ items }: { items?: Orders }) {
    // Translations
    const t = useTranslations("order");

    return (
        <section className="mb-8">
            <h2 className="font-bold text-5xl mb-6">{t("orders")}</h2>
            <ul className="flex flex-col gap-4">
                {/* all orders */}
                {fakeData?.map((items) => (
                    <li className="rounded-lg border bg-zinc-100 dark:bg-zinc-800" key={items.createdAt}>
                        {/* Header */}
                        <HeaderOrderItem order={items.orderNumber} date={items.createdAt} t={t} />

                        {/* Summary */}
                        <SummaryOrderItem price={items.totalPrice} orderStatus={items.status} paid={items.paid} t={t} />

                        {/* all items */}
                        <OrderItems data={items.data} />
                    </li>
                ))}
            </ul>
        </section>
    )
}



