import TableTemplate from '../Table';
import newOrders from '../../data/newOrders';

type Props = {};

let orderObj = newOrders;
console.log(orderObj);

const QueueTable: React.FunctionComponent<Props> = ({}) => (
  <TableTemplate
    orderObject={orderObj}
    headers={[
      { title: 'Work Order', align: 'left' },
      { title: 'Submission Date', align: 'left' },
      { title: 'Units / Quantity', align: 'center' },
      { title: 'Brand', align: 'center' },
      { title: 'Approve or Deny', align: 'center' },
    ]}
    colors={{ table: 'bg-gray-200', text: 'text-gray-600' }}
  />
);

export default QueueTable;
