import * as React from 'react';
import Link from 'next/link';
import newOrders from '../data/newOrders';

type Props = {};

const Table: React.FunctionComponent<Props> = ({}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Work Order</th>
        <th className="py-3 px-6 text-left">Submission Date</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Brand</th>
        <th className="py-3 px-6 text-center">Approve or Deny</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {/* {loading ? <p className="text-2xl">Loading ...</p> : null} */}
      {newOrders
        ? newOrders.map((order) => {
            return (
              <tr
                key={order.tracking_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.work_order_name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {order.created_at
                        .slice(0, 19)
                        .replace(/T/g, ' ')}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.initial_units_or_quantity}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.brand_entry}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link href={`/wo/${order.order_id}`}>
                      <button className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                        Full Details
                      </button>
                    </Link>
                    {/* <Link
                                href={{
                                pathname: '/approve/[slug]',
                                query: { slug: order.order_id },
                                }}
                            >
                                <a>Check Order{order.order_id}</a>
                            </Link> */}
                  </div>
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default Table;
