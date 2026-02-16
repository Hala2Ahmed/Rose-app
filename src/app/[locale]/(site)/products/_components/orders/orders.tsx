import OrderList from "./order-list";
import { allOrdersService } from "../../_services/all-orders.service";

export default async function Orders() {
    // TODO: I will use it after reviewing the orders
    // get orders
    // const orders = await allOrdersService();

    // console.log("orders=============",orders)
    
    return (<OrderList />)
}