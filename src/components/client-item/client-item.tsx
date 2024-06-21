import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Client } from '../../types';
import { useNavigate } from 'react-router-dom';

interface IClientItem {
    data: Client
}

const ClientItem: React.FC<IClientItem> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <Card
            actions={[
                <EditOutlined key="edit" onClick={() => navigate(`/clients/${data.id}`)} />,
                <LinkOutlined key="edit" onClick={() => navigate(`/clients/${data.id}`)} />
            ]}
            className="flex flex-col"
            classNames={{
                header: "!p-3 lg:!p-6",
                body: "flex-auto !p-3 lg:!p-6"
            }}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={data.attributes.name || "Имя не указано"}
                description={<div><p>{data.attributes.address || "Адрес не указан"}</p><p><p>{data.attributes.phone || "Телефон не указан"}</p></p></div>}
            />
        </Card>
    )
}

export default ClientItem