import OrderItem from "../../../components/order-item/order-item";
import { Client } from "../../../types";

interface IClientOrders {
    data: Client;
}

const ClientOrders: React.FC<IClientOrders> = ({ data }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data.attributes.orders.data.map((item) => (
                <OrderItem data={item} key={item.id} />
            ))}
        </div>
    )
}

export default ClientOrders