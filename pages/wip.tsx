import { useEffect, useState } from 'react';
import { supabaseClient } from '../lib/client';
import * as React from 'react';
import TableWip from '../components/Table/Views/WIP';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';

const WIPPage: NextPage = () => {
  const [WIPOrders, setWIPOrders] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchOrdersTrackerStatus(2).then((data: any) => {
      setWIPOrders(data.orders || [{}]);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Page layoutTitle="Not Started Orders | Work Management System | TuPack">
        {WIPOrders ? (
          <TableWip orders={WIPOrders} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default WIPPage;
