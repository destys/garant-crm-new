import { Radio } from "antd"
import useMasters from "../../../../hooks/use-masters"
import Loader from "../../../../components/loaders/loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/auth-context";
import { useQueryClient } from "@tanstack/react-query";

interface IAssignTheMaster {
    entryMasterId?: number;
    orderId: number;
}

const AssignTheMaster: React.FC<IAssignTheMaster> = ({ entryMasterId, orderId }) => {
    const { data, isLoading } = useMasters();
    const { userToken } = useAuth();
    const queryClient = useQueryClient();

    const handleSetMaster = async (masterId: number) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/orders/${orderId}?populate=users_permissions_user`,
                {
                    data: {
                        users_permissions_user: {
                            id: masterId,
                        },
                    },
                },
                {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                }
            )
            .then((response) => {
                queryClient.invalidateQueries({ queryKey: ['order'] });
                toast.success(`Назначен мастер ${response.data.data.attributes.users_permissions_user.data.attributes.name} ${response.data.data.attributes.users_permissions_user.data.attributes.last_name}!`)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <Radio.Group defaultValue={entryMasterId?.toString()} buttonStyle="solid" className="grid grid-cols-5 gap-4">
                {data?.map(master => (
                    <Radio.Button key={master.id} value={master.id.toString()} onClick={() => handleSetMaster(master.id)}>
                        {master.name} {master.last_name}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </>

    )
}

export default AssignTheMaster