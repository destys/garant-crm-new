import { useParams } from "react-router-dom";
import useOrder from "../../hooks/use-order";
import { Collapse } from "antd";
import LoaderWithBg from "../../components/loaders/loader-with-bg";
import CallActions from "./components/call-actions";
import Photos from "./components/photos/photos";
import EditInfo from "./components/edit-info/edit-info";
import ClientCard from "./components/client/client";

const OrderPage = () => {
    const params = useParams();
    const leadId = params.id ? parseInt(params.id) : 0;

    const { data, isLoading } = useOrder(leadId)
    console.log('data: ', data);

    if (!data) {
        return
    }

    const items = [
        { key: '1', label: 'Редактирование информации', children: <EditInfo data={data} /> },
        { key: '2', label: 'Информация о клиенте', children: <ClientCard data={data.attributes.client.data} /> },
        { key: '3', label: 'Фото техники', children: <Photos /> },
        { key: '4', label: 'Связь' },
        { key: '5', label: 'Расчеты' },
        { key: '6', label: 'Чат' },
        { key: '7', label: 'Мастер', },
    ]

    return (
        <div className="relative">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-4">
                <h1 className="font-bold text-2xl">{data.attributes.order_number}</h1>
                <CallActions />
            </div>
            <LoaderWithBg isLoading={isLoading} />
            <Collapse
                size="large"
                items={items}
            />

        </div>

    )
}

export default OrderPage