import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';
import CancelledTable from '../components/Table/Views/Cancelled';

const CancelledPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [workTasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    fetchOrdersTrackerStatus(99).then((data: any) => {
      setOrders(data.orders);
      setWorkTasks(data.workTasks);
    });
    return () => {};
  }, []);

  return (
    <>
      <Page
        layoutTitle="Cancelled Orders | Work Management System | TuPack"
        pageName="Cancelled Orders"
      >
        {orders ? (
          <CancelledTable orders={orders} workTasks={workTasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default CancelledPage;
