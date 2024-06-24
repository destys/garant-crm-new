
import useMasters from "../../hooks/use-masters"
import Loader from '../../components/loaders/loader';
import MasterItem from "../../components/master-item/master-item";
import MasterModal from "../../components/modals/master-modal";

const MastersPage = () => {
    const { data, isLoading, isError } = useMasters()


    return (
        <div className="relative">
            {isError && <div>Something went wrong</div>}
            <div className="mb-6">
                <MasterModal />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data?.map(master => (
                    <MasterItem key={master.id} data={master} />
                ))}
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}

export default MastersPage