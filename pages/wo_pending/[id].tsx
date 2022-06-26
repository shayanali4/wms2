import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { WOSummary } from '../../components/WorkOrderScreens/WOSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { EstimatedCosts } from '../../components/WorkOrderScreens/EstimatedCosts';
import { ActionWO } from '../../components/WorkOrderScreens/AcceptorReject/ActionWO';
import { supabaseClient } from '../../lib/client';
import {
  fetchBrands,
  fetchOneOrder,
  fetchWorkTasks,
  findSpecificFieldsForOrder,
  findWorkTask,
} from '../../data/services';

const Index: NextPage = (props) => {
  // const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [tasks, setTasks] = useState({});
  const [brands, setBrands] = useState({});

  useEffect(() => {
    const fetchNewOrders = async () => {
      const order = await fetchOneOrder(props.id);
      setWorkOrder(order || {});
      const specificFields = await findSpecificFieldsForOrder(
        props.id
      );
      setSpecifics(specificFields || {});
      const workTasks = await fetchWorkTasks();
      setTasks(workTasks || {});
      const brands = await fetchBrands();
      console.log(workTasks);
      console.log(brands);
      setBrands(brands || {});
    };
    fetchNewOrders().catch(console.error);
    return () => {
      setWorkOrder({}); // Clean up
      setSpecifics({}); // Clean up
      setTasks({}); // Clean up
      setBrands({}); // Clean up
    };
  }, []);

  return (
    <>
      <Layout title="Work order title tbc" />
      <WOSummary workOrder={workOrder} task={tasks} />
      <SpecificDetails specifics={specifics} workOrder={workOrder} />
      {/* add form here */}
      <EstimatedCosts
        task={tasks}
        workOrder={workOrder}
        brands={brands}
      />
      <ActionWO />
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log('SSPid: ', id);
  return {
    props: {
      id,
    },
  };
}
