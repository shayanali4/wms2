import Heading from '../Layout/Heading';
import Layout from '../Layout/Layout';
import Link from 'next/link';
type Props = {
  title?: string;
  layoutTitle?: string;
};

const Page: React.FunctionComponent<Props> = ({
  children,
  layoutTitle = 'This is the default title',
}) => (
  <>
    <Layout title={layoutTitle} />
    <main>
      <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
        <Heading text="WMS" />
        <Link href="/">
          <a>New Orders</a>
        </Link>
        <Link href="/notstarted">
          <a>Not Started</a>
        </Link>
        <Link href="/wip">
          <a>Work In Progress</a>
        </Link>
        <main
          role="main"
          className="w-full lg:w-5/6 flex-grow pt-1 px-3"
        >
          <div className="bg-white shadow-md rounded my-6">
            {children}
          </div>
        </main>
        <div className="w-fixed w-full flex-shrink flex-grow-0 px-2"></div>
      </div>
    </main>
  </>
);

export default Page;
