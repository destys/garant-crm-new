import { useEffect, useState } from 'react';
import { DatePicker, Form, Select } from 'antd';
import { Dayjs } from 'dayjs';
import useMasters from '../../../hooks/use-masters';
import Search from 'antd/es/input/Search';
import OrdersReport from '../../../components/orders-report/orders-report';

const { RangePicker } = DatePicker;

interface IFilters {
    onFilterChange: (filters: Record<string, string>) => void;
}

const Filters: React.FC<IFilters> = ({ onFilterChange }) => {
    const { data, isLoading } = useMasters();

    const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
    const [status, setStatus] = useState<string>('');
    const [master, setMaster] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    const statusesOptions = [
        { value: 'Все заявки', label: 'Все заявки' },
        { value: 'Новая', label: 'Новые заявки' },
        { value: 'Согласовать', label: 'Согласовать' },
        { value: 'Отправить инженера', label: 'Отправить инженера' },
        { value: 'Проверить', label: 'Проверить' },
        { value: 'Выдан', label: 'Выдан' },
        { value: 'Отказ', label: 'Отказ' },
    ];

    const masterOptions = data
        ? [{ value: 'Все мастера', label: 'Все мастера' }, ...data.map((master) => ({
            value: master.id,
            label: `${master.name} ${master.last_name}`,
        }))]
        : [{ value: 'Все мастера', label: 'Все мастера' }];

    const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
        setDates(dates);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
    };

    const handleMasterChange = (value: string) => {
        setMaster(value);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    useEffect(() => {
        const filters: Record<string, string> = {};

        if (dates) {
            filters['filters[correct_info][sold_date][$gte]'] = dates[0].format('YYYY-MM-DD');
            filters['filters[correct_info][sold_date][$lte]'] = dates[1].format('YYYY-MM-DD');
        }
        if (status && status !== 'Все заявки') {
            filters['filters[order_status][$eq]'] = status;
        }
        if (master && master !== 'Все мастера') {
            filters['filters[users_permissions_user][id][$eq]'] = master;
        }
        if (search) {
            if (search) {
                filters['filters[$or][0][order_number][$contains]'] = search;
                filters['filters[$or][1][client][phone][$contains]'] = search;
            }
        }

        onFilterChange(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates, status, master, search]);

    return (
        <Form className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            <Form.Item layout="vertical" className="xs:col-span-2 md:col-span-3 lg:col-span-4">
                <Search placeholder="Поиск по номеру телефона или номеру заказа" onSearch={handleSearchChange} />
            </Form.Item>
            <Form.Item label="Дата выезда" layout="vertical">
                <RangePicker className="w-full" onChange={(dates) => handleDateChange(dates as [Dayjs, Dayjs] | null)} />
            </Form.Item>
            <Form.Item label="Статус" layout="vertical">
                <Select options={statusesOptions} onChange={handleStatusChange} defaultValue={"Все статусы"} />
            </Form.Item>
            <Form.Item label="Мастер" layout="vertical">
                <Select loading={isLoading} options={masterOptions} onChange={handleMasterChange} defaultValue={"Все мастера"} />
            </Form.Item>
            <OrdersReport />
        </Form>
    );
};

export default Filters;
