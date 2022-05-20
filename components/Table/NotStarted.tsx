import TableTemplate from '../Table';
import newOrders from '../../data/newOrders';

type Props = {};

let orderObj = newOrders;
console.log(orderObj);

const NotStartedTable: React.FunctionComponent<Props> = ({}) => (
  <TableTemplate
    orderObject={orderObj}
    headers={[
      { title: 'TIME ACCEPTED', align: 'left' },
      { title: 'ORDER #', align: 'left' },
      { title: 'Task', align: 'left' },
      { title: 'Units/Quantity', align: 'center' },
      { title: 'Brand', align: 'center' },
      { title: 'Target Time', align: 'center' },
      { title: 'Initial Cost', align: 'center' },
      { title: 'Assigned To', align: 'center' },
      { title: 'Start Order', align: 'center' },
    ]}
    colors={{ table: 'bg-yellow-300', text: 'text-gray-600' }}
  />
);

export default NotStartedTable;
