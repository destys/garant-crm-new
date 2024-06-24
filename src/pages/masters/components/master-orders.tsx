
import { User } from "../../../types";

interface IMasterOrders {
    data: User;
}

const MasterOrders: React.FC<IMasterOrders> = ({ data }) => {
    console.log('data: ', data);
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* {data.attributes.orders.data.map((item) => (
                <OrderItem data={item} key={item.id} />
            ))} */}
        </div>
    )
}

export default MasterOrders