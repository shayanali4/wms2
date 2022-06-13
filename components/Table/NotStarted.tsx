import { NotStartedObject } from '../../interfaces/NotStartedObject';
import {
  getBrandName,
  getWorkerName,
  getWorkOrder,
} from '../../helpers/helpers';

type Props = { orders: NotStartedObject };

const NotStartedTable: React.FunctionComponent<Props> = ({
  orders,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-yellow-300 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Time Accepted</th>
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-center">Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Brand (Actual)</th>
        <th className="py-3 px-6 text-center">Target Time</th>
        <th className="py-3 px-6 text-center">Initial Cost</th>
        <th className="py-3 px-6 text-center">Assigned To</th>
        <th className="py-3 px-6 text-center">Start Order</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {orders
        ? orders.map((order) => {
            return (
              <tr
                key={order.tracking_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {order.time_accepted
                        ? (order.time_accepted as any)
                            .slice(0, 19)
                            .replace(/T/g, ' ')
                        : 'null'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getWorkOrder(order.id)}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getBrandName(order.brand_id)}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.target_time} minutes</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>£{order.initial_cost}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getWorkerName(order.assigned_to)}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                      value={order.id}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default NotStartedTable;
