import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchNewOrders } from '../data/services';
import NewOrderTable from '../components/Table/Views/NewOrders';

const IndexPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    let mounted = true;
    fetchNewOrders().then((data) => {
      setOrders(data.orders || [{}]);
      setWorkTasks(data.workTasks || [{}]);
    });
    return () => {
      mounted = false;
    };
  }, [orders]);

  useEffect(() => {
    // console.log(tasks[0].name); // Pre Pick and Pack
    // console.log(orders[2].id); // 14
    let orders2 = orders.map((o) => {
      const taskName = tasks && tasks.name ? tasks[o.id].name : 'hey';
      return { ...o, task_name: taskName };
    });
    console.log(orders);
    console.log(orders2);
    setOrders(orders2);
    return () => {
      // second
    };
  }, []);

  return (
    <>
      <Page layoutTitle="New Orders | Work Management System | TuPack">
        {orders ? (
          <NewOrderTable orders={orders} tasks={tasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default IndexPage;
