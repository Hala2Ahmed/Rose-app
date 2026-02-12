import { cn } from "@/lib/utils/tailwind-merge";
import { Banknote, Check, CheckCheck, CreditCard, TriangleAlert, Truck } from "lucide-react";

// interface
interface Props {
    price: number;
    orderStatus: string;
    paid: string;
    t: (key: string) => string;
}

export default function SummaryOrderItem({ price, orderStatus, paid, t }: Props) {

    // switch status design 
    let bg;
    let status;
    let statusDelivery;
    let colorDelivery;
    let iconDelivery;

    switch (orderStatus) {
        case "canceled":
            bg = "bg-red-600"
            status = "canceled"
            statusDelivery = "canceled"
            colorDelivery = "text-maroon-500"
            iconDelivery = <TriangleAlert />
            break;
        case "done":
            bg = "bg-emerald-500"
            status = "done"
            statusDelivery = "delivered"
            colorDelivery = "text-emerald-600"
            iconDelivery = <CheckCheck />
            break;
        default:
            bg = "bg-blue-500"
            status = "in_progress"
            statusDelivery = "pending"
            colorDelivery = "text-yellow-600"
            iconDelivery = <Truck />
            break;
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-b-zinc-200 px-4 py-3">
                {/* total price */}
                <div className="flex gap-4 items-center">
                    <p className="font-medium text-2xl">{t("total_price")}:
                        <span className="font-semibold text-2xl"> {price.toLocaleString()} EGP</span>
                    </p>
                    {orderStatus !== "canceled" &&
                        <div className="text-white flex items-center gap-2 px-2.5 py-1 bg-emerald-500 rounded-full">
                            <Check size={20} />
                            <span>{t("paid")}</span>
                        </div>
                    }
                </div>
                {/* status */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold">{t("status")}: </span>
                    <span className={cn(
                        "font-semibold text-white py-1 px-2.5 rounded-full", bg
                    )}>
                        {t(status)}
                    </span>
                </div>
            </div>

            <div className="px-8 py-3">
                {/* payment */}
                <div className="flex items-center gap-2">
                    <p className="font-semibold mb-2">{t("payment_method")}: </p>
                    <div className="flex items-center gap-1 text-zinc-500">
                        {paid === "cash" ? <Banknote /> : <CreditCard />}
                        <span className="font-medium capitalize">{paid}</span>
                    </div>
                </div>

                {/* delivery */}
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{t("delivery_status")}: </p>
                    <div className={cn("flex items-center gap-1", colorDelivery)}>
                        {iconDelivery}
                        <span className="font-medium">{t(statusDelivery)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}