import React, {
  useState,
  useReducer,
  lazy,
  Suspense,
  useEffect,
} from 'react';

import { supabaseClient } from '../lib/client';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import QueueTable from '../components/Table/Views/NewOrders';
import SideBar from '../components/SideBar';
import { NextPage } from 'next';
import TitleText from '../components/TitleText';
import Heading from '../components/Heading';
import TableInformation from '../components/TableInformation/TableInformation';

const IndexPage: NextPage = () => {
  const [table, setTable] = useState('');

  // useEffect(() => {
  //   setTable('newOrders')
  //   return () => {
  //     setTable('newOrders')
  //   };
  // }, []);

  const tHeadIndex = [
    'ID',
    'Submission Date',
    'Work Order',
    'Units / Quantity',
    'Brand (Customer Entry)',
    'Approve or Deny',
  ];

  return (
    <>
      <Layout title="Work Management System | TuPack" />
      <main>
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
          <Heading text="WMS" />
          {/* <NavBar /> */}
          <button onClick={() => setTable('newOrders')}>
            New Orders
          </button>
          <button onClick={() => setTable('notStarted')}>
            Not Started
          </button>
          <button onClick={() => setTable('wip')}>
            Work In Progress
          </button>
          <main
            role="main"
            className="w-full lg:w-5/6 flex-grow pt-1 px-3"
          >
            <div className="bg-white shadow-md rounded my-6">
              {table ? (
                <TableInformation name={table} />
              ) : (
                <div>Loading Table...</div>
              )}
            </div>
          </main>
          <div className="w-fixed w-full flex-shrink flex-grow-0 px-2"></div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
