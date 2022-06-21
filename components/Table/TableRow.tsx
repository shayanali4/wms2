type Props = {
  data: any;
};

// to add button link, put it to a flag and return it via a conditional

const TableRow: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <tr>
      {data.map((item: any) => {
        return <td key={item}>{item}</td>;
      })}
    </tr>
  );
};

export default TableRow;
