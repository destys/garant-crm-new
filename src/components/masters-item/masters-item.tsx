import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { User } from '../../types';

interface IMasterItem {
    data: User
}

const MastersItem: React.FC<IMasterItem> = ({ data }) => {
    return (
        <Card
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            className="flex flex-col"
            classNames={{
                body: "flex-auto"
            }}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={`${data.name} ${data.last_name}`}
                description={<div className=''><p>{data.phone}</p><p>{data.role.name}</p></div>}
                className="flex-auto"
            />
        </Card>
    )
}

export default MastersItem