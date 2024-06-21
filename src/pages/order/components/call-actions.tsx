import { Button } from "antd"
import { PhoneOutlined, MessageOutlined, FilePdfOutlined } from '@ant-design/icons';

interface ICallActions {
    phone: string

}

const CallActions: React.FC<ICallActions> = ({ phone }) => {
    console.log('phone: ', phone);
    return (
        <div className="flex items-center gap-4">
            <Button type="primary" shape="circle" size="large" href={`tel:${phone}`}>
                <PhoneOutlined />
            </Button>
            <Button type="primary" shape="circle" size="large">
                <MessageOutlined />
            </Button>
            <Button type="primary" shape="circle" size="large">
                <FilePdfOutlined />
            </Button>
        </div>
    )
}

export default CallActions