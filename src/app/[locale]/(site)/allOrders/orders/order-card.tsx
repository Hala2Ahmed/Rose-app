import Image from "next/image";
import { StarIcon } from "@/lib/svg";
import { OrderItem } from "@/lib/types";

export default function OrderCard({ item,t }: { item: OrderItem;t: (key: string) => string; }) {

    return (
        <div className="rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800 flex">
            {/* image */}
            <div className="h-30 w-24 relative">
                <Image src={item.image} className="object-cover" fill alt={item.title} />
            </div>
            {/* content */}
            <div className="p-2 flex flex-col justify-between">
                <div>
                    {/* title */}
                    <h3 className="text-maroon-600 dark:text-softPink-300 font-semibold text-sm">{item.title}</h3>

                    {/* rate */}
                    <div className="flex items-center gap-2 mt-0.5">
                        <StarIcon />
                        <div className="text-sm flex gap-1">{t("rating")}:
                            <p className="font-medium">5/5</p>
                            <p className="text-blue-600 text-sm font-medium">({item.rating} {t("ratings")})</p>
                        </div>
                    </div>
                </div>

                {/* price */}
                <div className="flex items-end gap-1">
                    {/* quantity */}
                    <p className="text-xs text-maroon-600 dark:text-softPink-300">(x{item.quantity})</p>
                    <p className="font-bold text-lg -mb-1.5">{item.price}</p>
                    <p className="text-xs">EGP</p>
                </div>
            </div >
        </div >
    )
}