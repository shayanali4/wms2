import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';
import NewOrdersTable from '../components/Table/Views/NewOrders';

const IndexPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    let mounted = true;
    fetchOrdersTrackerStatus(0).then((data: any) => {
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
      // const taskName = tasks ? tasks[o.id].name : 'hey';
      console.log(
        tasks.filter((task) => task.id == orders.work_task_id)
      );
      // const taskName = tasks.filter(
      //   (task) => task.id == order.work_task_id[0].name
      // );

      return { ...o, task_name: 'taskName' };
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
          <NewOrdersTable
            orders={orders.map((o) => ({
              ...o,
              task_name: tasks[o.work_task_id].name,
              // task_name: tasks.filter(
              //   (t) => t.id == o.work_task_id[0].name
              // ),
            }))}
            tasks={tasks}
          />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default IndexPage;
