type Props = {
  item: string;
};

const TableHeadItem: React.FunctionComponent<Props> = ({ item }) => {
  return <td title={item}>{item}</td>;
};

export default TableHeadItem;
