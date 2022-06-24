import React, { useEffect, useState } from 'react';
import { Wip, NewOrder, NotStarted } from '../Table/Views';
import { getTableInformation } from '../../data/services/index';

export default function TableInformation({ name }) {
  const [orders, setOrders] = useState([{}]);
  const [workTasks, setWorkTasks] = useState([{}]); // double check default
  const [task, setTask] = useState([{}]);

  useEffect(() => {
    let mounted = true;

    getTableInformation(name).then((data) => {
      if (mounted) {
        console.log(data);
        setOrders(data && data.orders ? data.orders : [{}]);
        setWorkTasks(data && data.workTasks ? data.workTasks : [{}]);
        // setTask(data?.task)
      }
    });
    return () => {
      mounted = false;
    };
  }, [name]);
  return (
    <div>
      {name === 'newOrders' ? (
        <NewOrder orders={orders} tasks={workTasks} />
      ) : null}
    </div>
  );
}
