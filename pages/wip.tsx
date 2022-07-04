import { useEffect, useState } from 'react';
import * as React from 'react';
import TableWip from '../components/Table/Views/WIP';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';

const WIPPage: NextPage = () => {
  const [WIPOrders, setWIPOrders] = useState(null);
  const [workers, setWorkers] = useState(null);

  useEffect(() => {
    fetchOrdersTrackerStatus(2).then((data: any) => {
      if (data.orders) {
        setWIPOrders(data.orders || [{}]);
      }
      if (data.workers) {
        setWorkers(data.workers || [{}]);
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <Page layoutTitle="Work Orders In Progress | Work Management System | TuPack">
        {WIPOrders ? (
          <TableWip orders={WIPOrders} workers={workers} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default WIPPage;
