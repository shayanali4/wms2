import TableRow from './TableRow';
import TableHeadItem from './TableHead';
type Props = {
  theadData: string[];
  tbodyData: Array<Array<any>>;
};

const Table: React.FunctionComponent<Props> = ({
  theadData,
  tbodyData,
}) => {
  return (
    <table className={'min-w-max w-full table-auto'}>
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          {theadData.map((h) => {
            return <TableHeadItem key={h} item={h} />;
          })}
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {tbodyData.map((item) => {
          return <TableRow key={item.id} data={item.items} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
