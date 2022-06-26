import { NotStartedObject } from '../../../interfaces/NotStartedObject';
import Link from 'next/link';

type Props = { orders: NotStartedObject; tasks: any };
const NotStartedTable: React.FunctionComponent<Props> = ({
  orders,
  tasks,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-yellow-300 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Time Accepted</th>
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-center">Work Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Brand (Actual)</th>
        <th className="py-3 px-6 text-center">Target Time</th>
        <th className="py-3 px-6 text-center">Initial Cost</th>
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
                    {/* <span>{tasks[].work_order_name}</span> */}
                    {/* <span>{tasks[2].name}</span> */}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>tbc</span>
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
                {/* <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getWorkerName(order.assigned_to)}</span>
                  </div>
                </td> */}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link href={`/start_wo/${order.id}`}>
                      <button className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                        Start
                      </button>
                    </Link>
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
