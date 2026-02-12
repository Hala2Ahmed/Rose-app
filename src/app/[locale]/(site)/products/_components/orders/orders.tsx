import OrderList from "./order-list";
import { fakeData } from "@/lib/constants/homepage.constant";
import { allOrdersService } from "../../_services/all-orders.service";

export default async function Orders() {
    // get orders
    // const orders = await allOrdersService()
    return (
        <section className="mb-8">
            <h2 className="font-bold text-5xl mb-6">Orders</h2>
            <ul className="flex flex-col gap-4">
                {/* all orders */}
                {fakeData?.map((items, i) => (
                    <OrderList key={i} items={items} />
                ))}
            </ul>
        </section>
    )
}