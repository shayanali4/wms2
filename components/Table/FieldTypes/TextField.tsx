type Props = {
  bold?: boolean;
  align?: string;
  value?: string;
};

const TextField: React.FunctionComponent<Props> = ({
  bold = false,
  align = 'left',
  value = 'Text Field here',
}) => (
  <td className={`py-3 px-6 text-${align} whitespace-nowrap`}>
    <div className="flex items-center">
      {bold ? (
        <span className="font-medium">
          <span className="font-medium">{value}</span>
        </span>
      ) : (
        <span>{value}</span>
      )}
    </div>
  </td>
);

export default TextField;
