import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Client } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface IClient {
    data: Client;
}

const ClientCard: React.FC<IClient> = ({ data }) => {
    const navigate = useNavigate();
    console.log('data: ', data);
    return (
        <Card
            style={{ width: 500 }}
            actions={[
                <EditOutlined key="edit" onClick={() => navigate(`/clients/${data.id}`)} />,
                <LinkOutlined key="edit" onClick={() => navigate(`/clients/${data.id}`)} />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={data.attributes.name || "Имя не указано"}
                description={data.attributes.address || "Адрес не указан"}
            />
        </Card>
    )
}

export default ClientCard