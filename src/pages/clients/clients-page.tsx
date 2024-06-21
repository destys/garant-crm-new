import Loader from '../../components/loaders/loader';
import ClientItem from "../../components/client-item/client-item";
import { Collapse, CollapseProps } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { FilterOutlined } from '@ant-design/icons';
import ClientsFilters from "./components/clients-filters";
import useClients from "../../hooks/use-clients";
import { Client } from '../../types';

const ClientsPage = () => {
    const [search, setSearch] = useState<string>("");
    const queryClient = useQueryClient();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useClients(search);
    const observer = useRef<IntersectionObserver>();

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Фильтрация',
            children: <ClientsFilters onFilterChange={setSearch} />,
        },
    ];

    useEffect(() => {
        // Обновляем данные при изменении строки запроса
        const invalidateFilters: InvalidateQueryFilters = {
            queryKey: ['clients', search],
        };
        queryClient.invalidateQueries(invalidateFilters);
    }, [search, queryClient]);

    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]);

    return (
        <div className="relative">
            <Collapse expandIcon={() => <FilterOutlined />} items={items} defaultActiveKey={['1']} className="mb-6" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data?.pages.map((page) => (
                    page.data.map((item: Client) => (
                        <ClientItem data={item} key={item.id} />
                    ))
                ))}
            </div>
            <div ref={lastElementRef} style={{ height: 1 }}></div>
            <Loader isLoading={isFetchingNextPage || isLoading} />
        </div>
    )
}

export default ClientsPage