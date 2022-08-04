import Link from 'next/link';
import { QueueObject } from '../../../interfaces/QueueObject';

type Props = { orders: QueueObject; tasks: QueueObject };

const NewOrderTable: React.FunctionComponent<Props> = ({
  orders,
  tasks,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Submission Date</th>
        <th className="py-3 px-6 text-left">Work Task</th>
        <th className="py-3 px-6 text-left">Units / Quantity</th>
        <th className="py-3 px-6 text-left">
          Brand (Customer Entry)
        </th>
        <th className="py-3 px-6 text-center">Approve or Deny</th>
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
                <td className="py-3 px-6 text-center">
                  <div className="flex align-center items-center">
                    <span className="text-center">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex align-center items-center">
                    <span className="text-center">
                      {order.created_at
                        ? String(
                            order.created_at
                              .slice(0, 19)
                              .replace(/T/g, ' ')
                          )
                        : null}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex align-center items-center">
                    <span className="text-center">
                      {
                        tasks.find(
                          (task) => task.id === order.work_task_id
                        )?.name
                      }
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex align-center items-center">
                    <span className="text-center">
                      {order.initial_units_or_quantity}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex align-center items-center">
                    <span className="text-center">
                      {order.brand_entry}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    <Link href={`/wo_pending/${order.id}`}>
                      <button className=" bg-blue-600 w-full rounded-md text-white outline-none focus:ring-4 shadow-lg">
                        {'Action'}
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

export default NewOrderTable;
