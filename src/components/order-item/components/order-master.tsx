import { UserOutlined } from '@ant-design/icons';

interface iOrderMaster {
    text: string;
}

const OrderMaster: React.FC<iOrderMaster> = ({ text }) => {
    return (
        <div>
            <UserOutlined key="ellipsis" content="Мастер" />
            <span className='pl-1'>{text}</span>
        </div>
    )
}

export default OrderMaster