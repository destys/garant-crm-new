import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import useClient from '../../hooks/use-client';
import ClientInfo from './components/client-info';
import ClientOrders from './components/client-orders';
import Loader from '../../components/loaders/loader';

const onChange = (key: string) => {
    console.log(key);
};



const ClientPage = () => {
    const params = useParams();
    const clientId = params.id ? parseInt(params.id) : 0;

    const { data, isLoading, isError } = useClient(clientId);

    if (!data) {
        return <Loader isLoading={isLoading} />;
    }
    
    if (isError) {
        return <div>Ошибка</div>
    }

    const items = [
        {
            key: "0",
            label: "Информация о клиенте",
            children: <ClientInfo data={data} />,
        },
        {
            key: "1",
            label: "Заказы клиента",
            children: <ClientOrders data={data} />,
        }
    ]



    return (
        <div>
            <h1 className="mb-4 font-bold text-2xl">{data.attributes.name || "Имя не указано"}</h1>
            <Tabs
                onChange={onChange}
                type="card"
                items={items}
                defaultActiveKey="0"
            />
        </div>
    )
}

export default ClientPage