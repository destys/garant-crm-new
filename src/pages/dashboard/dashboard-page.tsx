import { useState, useEffect } from 'react';
import { Order } from '../../types';
import useOrders from '../../hooks/use-orders';
import OrderItem from '../../components/order-item/order-item';
import Loader from '../../components/loaders/loader';
import Filters from '../../components/filters/filters';
import { useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const DashboardPage: React.FC = () => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const queryClient = useQueryClient();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrders(filters);

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Фильтрация',
            children: <Filters onFilterChange={setFilters} />,
        },
    ];

    useEffect(() => {
        // Обновляем данные при изменении строки запроса
        const invalidateFilters: InvalidateQueryFilters = {
            queryKey: ['orders', filters],
        };
        queryClient.invalidateQueries(invalidateFilters);
    }, [filters, queryClient]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (hasNextPage) fetchNextPage();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasNextPage]);

    return (
        <div className="relative">
            <Collapse expandIcon={() => <FilterOutlined />} items={items} defaultActiveKey={['1']} className="mb-6" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {data?.pages.map((page) => (
                    page.data.map((item: Order) => (
                        <OrderItem data={item} key={item.id} />
                    ))
                ))}
            </div>
            <Loader isLoading={isFetchingNextPage || isLoading} />
        </div>
    );
};

export default DashboardPage;
