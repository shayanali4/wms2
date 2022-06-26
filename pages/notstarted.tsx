import { useEffect, useState } from 'react';
import { supabaseClient } from '../lib/client';
import Layout from '../components/Layout/Layout';
import NavBar from '../components/Layout/NavBar';
import SideBar from '../components/Layout/SideBar';
import { NextPage } from 'next';
import TitleText from '../components/Layout/TitleText';
import Heading from '../components/Layout/Heading';
import Table from '../components/Table/Table';
import Button from '../components/Button/Button';
import NotStartedTable from '../components/Table/Views/NotStarted';

const NotStartedPage: NextPage = () => {
  const [notStartedOrders, setNotStartedOrders] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotStartedOrders = async () => {
      const { data } = await supabaseClient
        .from('order')
        .select('*')
        .eq('tracker_status', 1);
      console.log(data);
      setNotStartedOrders(data || [{}]);
      setLoading(false);
    };
    fetchNotStartedOrders().catch(console.error);
    return () => {
      setNotStartedOrders([{}]); // Clean up
      setLoading(true); // Clean up
    };
  }, []);

  const tHeadNotStarted = [
    'Time Accepted',
    'ID',
    'Task',
    'Units / Quantity',
    'Brand (Actual)',
    'Target Time',
    'Initial Cost',
    'Start Order',
  ];

  const tRow = [
    {
      id: '1',
      items: [
        'John',
        'john@email.com',
        <Button text="Full Details" hyperlink={`/wo_pending/${3}`} />,
      ],
    },
    {
      id: '2',
      items: ['Sally', 'sally@email.com', '12/24/2020'],
    },
    {
      id: '3',
      items: ['Maria', 'maria@email.com', '12/01/2020'],
    },
  ];

  return (
    <>
      <Layout title="Not Started | Work Management System | TuPack" />
      <main>
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
          <Heading text="WMS" />
          <NavBar />
          <main
            role="main"
            className="w-full lg:w-5/6 flex-grow pt-1 px-3"
          >
            {/* main content */}
            {loading ? <p className="text-2xl">Loading ...</p> : null}
            <div className="bg-white shadow-md rounded my-6">
              <TitleText text="Not Started" />
              {/* {notStartedOrders ? (
                <NotStartedTable orders={notStartedOrders} />
              ) : null} */}
            </div>
          </main>
          <Table theadData={tHeadNotStarted} tbodyData={tRow} />
          <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
            <SideBar />
          </div>
        </div>
      </main>
    </>
  );
};

export default NotStartedPage;
