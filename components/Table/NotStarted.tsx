import TableTemplate from '../Table';
import newOrders from '../../data/newOrders';

type Props = {};

let orderObj = newOrders;
console.log(orderObj);

const NotStartedTable: React.FunctionComponent<Props> = ({}) => (
  <TableTemplate
    orderObject={orderObj}
    headers={[
      {
        title: 'Time Accepted',
        objKey: 'time_accepted',
        alignHeader: 'left',
        field: {
          type: 'dateTime',
          props: { bold: false, align: 'left' },
        },
      },
      {
        title: 'ORDER #',
        alignHeader: 'left',
        objKey: 'tracking_id',
        field: { type: 'text', props: { bold: true, align: 'left' } },
      },
      {
        title: 'Task',
        alignHeader: 'left',
        objKey: 'work_order_name',
        field: {
          type: 'text',
          props: { bold: true, align: 'center' },
        },
      },
      {
        title: 'Units/Quantity',
        alignHeader: 'center',
        objKey: 'work_order_name',
        field: {
          type: 'number',
          props: { bold: false, align: 'center' },
        },
      },
      {
        title: 'Brand',
        alignHeader: 'center',
        objKey: 'brand_system',
        field: {
          type: 'text',
          props: { bold: false, align: 'center' },
        },
      },
      {
        title: 'Target Time',
        alignHeader: 'center',
        objKey: 'target_time',
        field: {
          type: 'text',
          props: { bold: false, align: 'center' },
        },
      },
      {
        title: 'Initial Cost',
        alignHeader: 'center',
        objKey: 'cost_initial',
        field: {
          type: 'number',
          props: { bold: false, align: 'center' },
        },
      },
      {
        title: 'Assigned To',
        alignHeader: 'center',
        objKey: 'assigned_to',
        field: {
          type: 'text',
          props: { bold: false, align: 'center' },
        },
      },
      {
        title: 'Start Order',
        alignHeader: 'center',
        objKey: 'tracking_id',
        field: {
          type: 'text',
          props: {
            value: 'Update',
            align: 'center',
            color: 'bg-yellow-300',
          },
        },
      },
    ]}
    colors={{ table: 'bg-yellow-300', text: 'text-gray-600' }}
  />
);

export default NotStartedTable;
