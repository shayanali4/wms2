import React, { useEffect, useState } from 'react';
import { Wip, NewOrder, NotStarted } from '../Table/Views';
import {
  getTableInformation,
  getWorkTaskNames,
} from '../../data/services/index';

export default function TableInformation({ name }) {
  const [orders, setOrders] = useState([{}]);
  const [workTasks, setWorkTasks] = useState([{}]);
  const [taskNames, setTaskNames] = useState([]);

  useEffect(() => {
    let mounted = true;
    let taskNames: [];
    getTableInformation(name).then((data) => {
      if (mounted) {
        setOrders(data && data.orders ? data.orders : [{}]);
        if (data && data.orders && data.workTasks) {
          const ordersWithTasks = getWorkTaskNames(
            data.orders,
            data.workTasks
          );
          setOrders(ordersWithTasks);
        }
        setWorkTasks(data && data.workTasks ? data.workTasks : [{}]);

        setTaskNames(taskNames || []);
      }
    });
    return () => {
      mounted = false;
    };
  }, [name]);
  return (
    <div>
      {name === 'newOrders' ? <NewOrder orders={orders} /> : null}
    </div>
  );
}
