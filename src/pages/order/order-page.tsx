import { useParams } from "react-router-dom";
import useOrder from "../../hooks/use-order";
import { Collapse } from "antd";
import LoaderWithBg from "../../components/loaders/loader-with-bg";
import CallActions from "./components/call-actions";
import EditInfo from "./components/edit-info/edit-info";
import ClientCard from "./components/client/client";
import UploadPhotos from "./components/upload-photos/upload-photos";
import UploadDocuments from "./components/upload-documents/upload-documents";

const OrderPage = () => {
    const params = useParams();
    const leadId = params.id ? parseInt(params.id) : 0;

    const { data, isLoading } = useOrder(leadId)
    console.log('data: ', data);

    if (!data) {
        return
    }

    const items = [
        { key: 'EditInfo', label: 'Редактирование информации', children: <EditInfo data={data} /> },
        { key: 'ClientCard', label: 'Информация о клиенте', children: <ClientCard data={data.attributes.client.data} /> },
        { key: 'UploadPhotos', label: 'Фото техники', children: <UploadPhotos orderId={data.id} data={data.attributes.device_photos.data} /> },
        { key: 'UploadDocuments', label: 'Загрузка документов', children: <UploadDocuments orderId={data.id} data={data.attributes.order_files.data} /> },
        { key: '5', label: 'Связь' },
        { key: '6', label: 'Расчеты' },
        { key: '7', label: 'Чат' },
        { key: '8', label: 'Мастер', },
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