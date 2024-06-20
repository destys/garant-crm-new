import { Order } from "../../types";

interface IModalTitle {
    data: Order | null;

}

const ModalTitle: React.FC<IModalTitle> = ({ data }) => {
    if (!data) {
        return null;
    }
    return (
        <div className="p-4 pr-6 bg-[rgb(229 229 229)]">
            <div className="text-2xl">{data.attributes.order_number}</div>
            <div>{data.attributes.users_permissions_user.data !== null ? data.attributes.users_permissions_user.data?.attributes?.name + " " + data.attributes.users_permissions_user.data?.attributes?.last_name : "Мастер не назначен"}</div>
        </div>
    )
}

export default ModalTitle