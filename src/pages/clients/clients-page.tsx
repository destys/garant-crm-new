
import useMasters from "../../hooks/use-masters"
import Loader from '../../components/loaders/loader';
import MastersItem from "../../components/masters-item/masters-item";

const ClientsPage = () => {
    const { data, isLoading, isError } = useMasters()

    return (
        <div className="relative">
            {isError && <div>Something went wrong</div>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data?.map(master => (
                    <MastersItem key={master.id} data={master} />
                ))}
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}

export default ClientsPage