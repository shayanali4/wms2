type Props = {
  bold?: boolean;
  align?: string;
  value?: string;
};

const DateTimeField: React.FunctionComponent<Props> = ({
  bold = false,
  align = 'center',
  value = '2022-01-01 00:00:01',
}) => (
  <td className={`py-3 px-6 text-${align}`}>
    <div className="flex items-center">
      {bold ? (
        <span className="font-medium">
          {value.slice(0, 19).replace(/T/g, ' ')}
        </span>
      ) : (
        <span>{value}</span>
      )}
    </div>
  </td>
);

export default DateTimeField;
