
import { QueueObject } from '../interfaces/QueueObject';
import Button from './Table/FieldTypes/ButtonField';
import DateTimeField from './Table/FieldTypes/DateTimeField';
import Number from './Table/FieldTypes/NumberField';
import TextField from './Table/FieldTypes/TextField';

const HEADERS = [
  {
    name: 'TIME ACCEPTED',
    objValue: 'time_accepted',
    fieldType: 'normal',
    alignText: 'left',
  },
  {
    name: 'ORDER #',
    objValue: 'tracking_id',
    fieldType: 'normal',
    alignText: 'center',
  },
  {
    name: 'TASK',
    objValue: 'work_order_name',
    fieldType: 'bold',
    alignText: 'left',
  },
  {
    name: 'UNITS/QUANTITY',
    objValue: 'initial_units_or_quantity',
    fieldType: 'normal',
    alignText: 'center',
  },
  {
    name: 'BRAND',
    objValue: 'brand_system',
    fieldType: 'normal',
    alignText: 'center',
  },
  {
    name: 'TARGET TIME',
    objValue: 'target_time',
    fieldType: 'bold',
    alignText: 'center',
  },
  {
    name: 'INITIAL COST',
    objValue: 'cost_initial',
    fieldType: 'normal',
    alignText: 'center',
  },
  {
    name: 'ASSIGNED TO',
    objValue: 'assigned_to',
    fieldType: 'normal',
    alignText: 'center',
  },
];

type Props = {
  orderObject?: QueueObject;
  headers: {
    title: string;
    objKey: string;
    alignHeader: string;
    field: {
      type: string;
      props: any;
    };
  }[];
  colors?: { table: string; text: string };
  view?: {};
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
    {
      title: 'TARGET TIME',
      objKey: 'target_time',
      alignHeader: 'centre',
      field: {
        type: 'dateTime',
        props: { bold: false, align: 'center' },
      },
    },
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
                <th
                  className={`py-3 px-6 text-${header.alignHeader}`}
                >
                  {header.title}
                </th>
              );
            })
          : null}
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {orderObject
        ? orderObject.map((order, i) => {
            {
              console.log(order);
              console.log(order.tracking_id);
            }
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

export default TableHeaderTemplate;
