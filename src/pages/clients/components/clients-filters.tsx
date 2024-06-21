import { useEffect, useState } from 'react';
import { Form } from 'antd';
import Search from 'antd/es/input/Search';

interface IClientsFilters {
    onFilterChange: (search: string) => void;
}

const ClientsFilters: React.FC<IClientsFilters> = ({ onFilterChange }) => {
    const [search, setSearch] = useState<string>('');

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    useEffect(() => {
        const filters: Record<string, string> = {};

        if (search) {
            filters['filters[$or][0][client][name][$contains]'] = search;
            filters['filters[$or][1][client][phone][$contains]'] = search;
            filters['filters[$or][2][client][address][$contains]'] = search;
        }

        onFilterChange(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <Form className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            <Form.Item layout="vertical" className="xs:col-span-2 md:col-span-3 lg:col-span-4">
                <Search placeholder="Поиск по имени, телефону или адресу клиента" onSearch={handleSearchChange} />
            </Form.Item>
        </Form>
    );
};

export default ClientsFilters;
