import Link from 'next/link';

type Props = { text: string; hyperlink: string };

const Button: React.FunctionComponent<Props> = ({
  hyperlink = '#',
  text,
}) => {
  return (
    <div className="flex item-center justify-center">
      <Link href={hyperlink}>
        <button className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default Button;
