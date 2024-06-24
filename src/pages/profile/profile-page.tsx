import Loader from "../../components/loaders/loader";
import { useAuth } from "../../context/auth-context"
import useMaster from "../../hooks/use-master";
import MasterInfo from "../masters/components/master-info"

const ProfilePage = () => {
    const { userId } = useAuth();
    const { data, isLoading, isError } = useMaster(userId);

    if (!data) return null;

    return (
        <>
            {isError && <div>Ошибка</div>}
            <h1 className="mb-4 font-bold text-2xl">{data.name} {data.last_name}</h1>
            {isLoading ? <Loader isLoading={isLoading} /> : <MasterInfo data={data} />}
        </>
    )
}

export default ProfilePage