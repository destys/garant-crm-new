import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';

interface IMasterItem {
    data: User
}

const MasterItem: React.FC<IMasterItem> = ({ data }) => {
    console.log('data: ', data);
    const navigate = useNavigate();
    return (
        <Card
            actions={[
                <EditOutlined key="edit" onClick={() => navigate(`/masters/${data.id}`)} />,
                <LinkOutlined key="edit" onClick={() => navigate(`/masters/${data.id}`)} />
            ]}
            className="flex flex-col"
            classNames={{
                body: "flex-auto"
            }}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={`${data.name} ${data.last_name}`}
                description={<div className=''><p>{data.phone}</p><p>{data.role.description}</p></div>}
                className="flex-auto"
            />
        </Card>
    )
}

export default MasterItem