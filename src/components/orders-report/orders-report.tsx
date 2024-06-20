import { Button } from "antd";

interface IOrdersReport {

}

const OrdersReport: React.FC<IOrdersReport> = () => {
    return (
        <div className=" mt-[29px]">
            <Button type={"primary"} className="w-full">Скачать отчет в PDF</Button>
        </div>

    )
}

export default OrdersReport