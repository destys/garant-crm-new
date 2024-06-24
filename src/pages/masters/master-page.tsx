import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import useMaster from '../../hooks/use-master';

import Loader from '../../components/loaders/loader';
import MasterOrders from './components/master-orders';
import MasterInfo from './components/master-info';

const onChange = (key: string) => {
  console.log(key);
};



const MasterPage = () => {
  const params = useParams();
  const masterId = params.id ? parseInt(params.id) : 0;

  const { data, isLoading, isError } = useMaster(masterId);
  console.log('data: ', data);

  if (!data) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Ошибка</div>
  }

  const items = [
    {
      key: "0",
      label: "Информация о мастере",
      children: <MasterInfo data={data} />,
    },
    {
      key: "1",
      label: "Заказы мастера",
      children: <MasterOrders masterId={data.id} />,
    }
  ]



  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">{`${data.name} ${data.last_name}` || "Имя не указано"}</h1>
      <Tabs
        onChange={onChange}
        type="card"
        items={items}
        defaultActiveKey="0"
      />
    </div>
  )
}

export default MasterPage