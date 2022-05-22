type Props = {
  bold?: boolean;
  align?: string;
  value?: string;
};

const Number: React.FunctionComponent<Props> = ({
  bold = false,
  align = 'left',
  value = 999,
}) => (
  <td className={`py-3 px-6 text-${align}`}>
    <div className="flex items-center justify-center">
      {bold ? (
        <span className="font-medium">{value}</span>
      ) : (
        <span>{value}</span>
      )}
    </div>
  </td>
);

export default Number;
