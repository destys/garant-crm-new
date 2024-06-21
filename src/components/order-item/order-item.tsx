import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Order } from '../../types';

import { Link, useNavigate } from 'react-router-dom';
import OrderMaster from './components/order-master';
import OrderHeader from './components/order-header';

interface IOrderItem {
    data: Order;
}

const OrderItem: React.FC<IOrderItem> = ({ data }) => {

    const navigate = useNavigate();

    const masterName = data.attributes?.users_permissions_user.data !== null ? `${data.attributes?.users_permissions_user.data?.attributes?.name} ${data.attributes?.users_permissions_user.data?.attributes.last_name}` : 'Не назначен';
    return (
        <Card title={<OrderHeader title={data.attributes.order_number} status={data.attributes.order_status} />} actions={[
            <EditOutlined key="edit" onClick={() => navigate(`/orders/${data.id}`)} />,
            <OrderMaster key="ellipsis" text={masterName} />
        ]} className="flex flex-col" classNames={{
            header: "!p-3 lg:!p-6",
            body: "flex-auto !p-3 lg:!p-6"
        }}>
            <div className="flex gap-2 mb-2">
                <strong>Дата выезда:</strong>
                <span>{`${data.attributes.correct_info?.sold_date || "не заполнено"} ${data.attributes.correct_info?.sold_time
                    ? data.attributes.correct_info?.sold_time
                    : ""
                    }`}</span>
            </div>
            <div className="mb-2">
                <div><strong>Информация об устройстве:</strong></div>
                <p className="text-sm leading-none text-gray-600 mb-1 truncate ... w-[200px]">
                    {data.attributes.correct_info.device}
                </p>
                <p className="text-sm leading-none text-gray-600 mb-1">
                    {data.attributes.correct_info.brand}
                </p>
                <p className="text-sm leading-none text-gray-600 mb-2">
                    {data.attributes.correct_info.model_code}
                </p>
            </div>
            <div className="mb-2">
                <strong>Клиент:</strong>
                <p>
                    <Link
                        to={`tel:${data.attributes.client?.data?.attributes.phone}`}
                    >
                        {data.attributes.client?.data?.attributes.phone}
                    </Link>
                </p>
                <p className="font-bold md:hidden">Адрес выезда:</p>
                <p>{data.attributes.client?.data?.attributes.address || "Не задан"}</p>
            </div>
        </Card>
    )
}

export default OrderItem