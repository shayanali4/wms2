import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';
import CompletedTable from '../components/Table/Views/Completed';

const CompletedPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    let mounted = true;
    fetchOrdersTrackerStatus(3).then((data: any) => {
      setOrders(data.orders || [{}]);
      setWorkTasks(data.workTasks || [{}]);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Page layoutTitle="Completed Orders | Work Management System | TuPack">
        {orders ? (
          <CompletedTable orders={orders} tasks={tasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default CompletedPage;
