import { useCallback, useRef } from "react";
import OrderItem from "../../../components/order-item/order-item";
import useOrders from "../../../hooks/use-orders";
import Loader from "../../../components/loaders/loader";

interface IMasterOrders {
    masterId: number;
}

const MasterOrders: React.FC<IMasterOrders> = ({ masterId }) => {
    const filters = { 'filters[users_permissions_user][id][$eq]': masterId.toString() };
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrders(filters);
    const observer = useRef<IntersectionObserver>();


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
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {data?.pages.map((page) => (
                    page.data.map((item) => (
                        <OrderItem data={item} key={item.id} />
                    ))
                ))}
            </div>
            <div ref={lastElementRef} style={{ height: 1 }}></div>
            <Loader isLoading={isFetchingNextPage || isLoading} />
        </>
    )
}

export default MasterOrders