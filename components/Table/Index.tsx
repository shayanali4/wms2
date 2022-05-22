import workOrders from '../../data/workOrders';
import { QueueObject } from '../../interfaces/QueueObject';

type Props = { orders: QueueObject };

const workOrderData = workOrders;

const QueueTable: React.FunctionComponent<Props> = ({ orders }) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Submission Date</th>
        <th className="py-3 px-6 text-center">Work Order</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Brand</th>
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
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {order.created_at
                        ? order.created_at
                            .slice(0, 19)
                            .replace(/T/g, ' ')
                        : null}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {workOrderData.filter(
                        (wo) => wo.id === order.id
                      )[0]
                        ? workOrderData.filter(
                            (wo) => wo.id === order.id
                          )[0].name
                        : 'null'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.brand_entry}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                      value={order.id}
                    >
                      Full Details
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

export default QueueTable;
