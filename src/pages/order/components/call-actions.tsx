import { Button } from "antd"
import { PhoneOutlined, MessageOutlined, FilePdfOutlined } from '@ant-design/icons';


const CallActions = () => {
    return (
        <div className="flex items-center gap-4">
            <Button type="primary" shape="circle" size="large" href="tel:+79773583859">
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