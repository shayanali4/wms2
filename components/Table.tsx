const HEADERS = [
  'TIME ACCEPTED',
  'ORDER #',
  'TASK',
  'UNITS/QUANTITY',
  'BRAND',
  'TARGET TIME',
  'INITIAL COST',
  'ASSIGNED TO',
];

type Props = {
  orderObject: {
    tracking_id: string;
    work_order_name: string;
    created_at: string;
    initial_units_or_quantity: number;
    brand_entry: string;
    brand_system: string;
    order_id: number;
    time_accepted: string;
    target_time: string;
    cost_initial: number;
    assigned_to: string;
  }[];
  headers: { title: string; align: string }[];
  colors?: { table: string; text: string };
};

const EXAMPLE = [
  {
    work_order_name: 'testtt',
    tracking_id: 'TBC0945',
    created_at: '2022-04-08 16:14:45',
    initial_units_or_quantity: 4,
    brand_entry: 'Dior',
    brand_system: 'Christian Dior',
    order_id: 3564,
    time_accepted: '2022-04-09 14:34:23',
    target_time: '60 mins',
    cost_initial: 45,
    assigned_to: 'Damien',
  },
  {
    work_order_name: 'next test',
    tracking_id: 'Hov15Me',
    created_at: '2022-05-06 14:34:23',
    initial_units_or_quantity: 4,
    brand_entry: 'Dior',
    brand_system: 'Christian Dior',
    order_id: 3564,
    time_accepted: '2022-05-07 15:35:56',
    target_time: '90 mins',
    cost_initial: 60,
    assigned_to: 'Mark',
  },
];

const TableHeaderTemplate: React.FunctionComponent<Props> = ({
  orderObject = EXAMPLE,
  headers = [
    { title: 'TARGET TIME', align: 'centre', value: 'test' },
  ],
  //   Using tailwind colors (see https://tailwindcss.com/docs/text-color)
  colors = { table: 'bg-gray-200', text: 'text-gray-600' },
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr
        className={`${colors.table} ${colors.text} uppercase text-sm leading-normal`}
      >
        {headers
          ? headers.map((header) => {
              return (
                <th className={`py-3 px-6 text-${header.align}`}>
                  {header.title}
                </th>
              );
            })
          : null}
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {orderObject
        ? orderObject.map((order) => {
            {
              console.log(order);
              console.log(order.tracking_id);
            }
            return (
              <tr
                key={order.tracking_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {/* date & time */}
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {order.time_accepted
                        .slice(0, 19)
                        .replace(/T/g, ' ')}
                    </span>
                  </div>
                </td>
                {/* number */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.tracking_id}</span>
                  </div>
                </td>
                {/* text header */}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.work_order_name}
                    </span>
                  </div>
                </td>
                {/* number */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.initial_units_or_quantity}</span>
                  </div>
                </td>
                {/* number */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.brand_system}</span>
                  </div>
                </td>
                {/* date & time */}
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{order.target_time}</span>
                  </div>
                </td>
                {/* text header */}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      £{order.cost_initial}
                    </span>
                  </div>
                </td>
                {/* number */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.assigned_to}</span>
                  </div>
                </td>
                {/* button */}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                      value={order.order_id}
                      // onClick={handleClick}
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

export default TableHeaderTemplate;
