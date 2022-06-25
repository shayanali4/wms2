import { WIPObject } from '../../../interfaces/WIPObject';
import {
  getBrandName,
  getWorkerName,
  getWorkOrder,
} from '../../../helpers/helpers';
import Link from 'next/link';

type Props = { orders: WIPObject };

const DeclinedTable: React.FunctionComponent<Props> = ({
  orders,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Creation Date</th>
        <th className="py-3 px-6 text-center">Brand (Actual)</th>
        <th className="py-3 px-6 text-left">Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Rejection Note</th>
        <th className="py-3 px-6 text-center">View All</th>
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
                      {'tbc'}
                      {/* {(order.start_time as any)
                        .slice(0, 19)
                        .replace(/T/g, ' ')} */}
                    </span>
                  </div>
                </td>
                {/* tracking id */}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                {/* order creation date */}
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {'tbc'}
                      {/* {(order.created_at as any)
                        .slice(0, 19)
                        .replace(/T/g, ' ')} */}
                    </span>
                  </div>
                </td>
                {/* brand */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getBrandName(order.brand_id)}</span>
                  </div>
                </td>
                {/* work task */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{getWorkOrder(order.id)}</span>
                  </div>
                </td>
                {/* units */}
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>
                {/* rejection note */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.decline_reason}</span>
                  </div>
                </td>
                {/* button */}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link href={`/finish/${order.id}`}>
                      <button
                        className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                        value={order.id}
                      >
                        View all data
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

export default DeclinedTable;
