import React from 'react'
import { Order } from '../../types';
import { Collapse } from 'antd';
import EditInfo from './components/edit-info';

interface IOrderDetails {
    data: Order;
}

const OrderDetails: React.FC<IOrderDetails> = ({ data }) => {
    console.log('data: ', data);

    const items = [
        { key: '1', label: 'Редактирование информации', children: <EditInfo data={data} /> },
        { key: '2', label: 'Информация о клиенте' },
        { key: '3', label: 'Фото техники' },
        { key: '4', label: 'Связь' },
        { key: '5', label: 'Расчеты' },
        { key: '6', label: 'Чат' },
        { key: '7', label: 'Мастер', },
    ]

    return (
        <Collapse
            size="large"
            items={items}
        />
    )
}

export default OrderDetails