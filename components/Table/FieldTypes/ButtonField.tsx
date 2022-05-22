type Props = {
  align?: string;
  value?: string;
  color?: string;
  text?: string;
};

const Button: React.FunctionComponent<Props> = ({
  align = 'left',
  value = 999,
  color = 'bg-blue-600',
  text = 'demoString',
}) => (
  <td className={`py-3 px-6 text-${align}`}>
    <div className="flex item-center justify-center">
      <button
        className={`px-3 py-1 ${color} rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform`}
        value={value}
      >
        {text}
      </button>
    </div>
  </td>
);

export default Button;
