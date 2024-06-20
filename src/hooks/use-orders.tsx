import axios from 'axios';
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { Order, StrapiResponse } from '../types';
import { useAuth } from '../context/auth-context';

const getData = async (
    page: number,
    pageSize: number,
    role: string,
    userId?: number | null,
    filters?: Record<string, string>
): Promise<StrapiResponse<Order>> => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate': '*',
        'sort': 'publishedAt:desc',
    };

    if (role && role !== 'admin') {
        params['filters[users_permissions_user][id][$eq]'] = userId;
    }

    if (filters) {
        Object.keys(filters).forEach((key) => {
            params[key] = filters[key];
        });
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
        params,
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });

    return response.data;
};

const useOrders = (filters: Record<string, string>) => {
    const { userId, role } = useAuth();
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<StrapiResponse<Order>, Error>({
        queryKey: ['orders', filters],
        queryFn: ({ pageParam = 1 }: QueryFunctionContext) => {
            if (typeof pageParam === 'number') {
                return getData(pageParam, 12, role, userId, filters);
            } else {
                throw new Error('pageParam должен быть числом');
            }
        },
        getNextPageParam: (lastPage) => {
            const morePagesExist = lastPage.meta.pagination.page < lastPage.meta.pagination.pageCount;
            return morePagesExist ? lastPage.meta.pagination.page + 1 : undefined;
        },
        initialPageParam: 1,
    });

    return { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export default useOrders;
