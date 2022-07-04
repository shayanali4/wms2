import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchAllOrders } from '../data/services';
import NewOrderTable from '../components/Table/Views/NewOrders';

const IndexPage: NextPage = () => {
  const [orders, setOrders] = useState([]);
  const [workTasks, setWorkTasks] = useState([]);

  useEffect(() => {
    fetchAllOrders().then((data: any) => {
      if (data.orders) {
        setOrders(data.orders);
      }
      if (data.workTasks) {
        setWorkTasks(data.workTasks);
      }
    });
  }, []);

  return (
    <>
      <Page layoutTitle="New Orders | Work Management System | TuPack">
        {orders && workTasks ? (
          <NewOrderTable orders={orders} tasks={workTasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default IndexPage;
