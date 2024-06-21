import { Client } from '../../../../types';
import ClientItem from '../../../../components/client-item/client-item';

interface IClient {
    data: Client;
}

const ClientCard: React.FC<IClient> = ({ data }) => {
    console.log('data: ', data);
    return (
        <ClientItem data={data} />
    )
}

export default ClientCard