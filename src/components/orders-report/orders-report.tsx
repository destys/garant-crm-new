import { Button } from "antd";
import { Order } from "../../types";

interface IOrdersReport {
    orders: Order[]
}

const OrdersReport: React.FC<IOrdersReport> = ({ orders }) => {
    console.log('orders: ', orders);
    return (
        <div className="mt-[29px]">
            <Button type={"primary"} className="w-full">Скачать отчет в PDF</Button>
        </div>

    )
}

export default OrdersReport