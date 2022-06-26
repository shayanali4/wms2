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
      console.log(workTasks, brands);
      setBrands(brands || {});
    };
    fetchNewOrders().catch(console.error);
    return () => {
      setWorkOrder({});
      setSpecifics({});
      setTasks({});
      setBrands({});
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = {};

    Array.prototype.forEach.call(
      e.target.elements,
      (element: Element) => {
        element.id == 'updateTime'
          ? (formData = { ...formData, target_time: element.value })
          : null;
        element.id == 'updateCost'
          ? (formData = { ...formData, initial_cost: element.value })
          : null;
        if (element.id == 'submitReject') {
          formData = { ...formData, tracker_status: 99 };
        } else if (element.id == 'submitAccept') {
          formData = { ...formData, tracker_status: 2 };
        }
        element.id == 'initialComments' && element.value
          ? (formData = {
              ...formData,
              initial_comments: element.value,
            })
          : null;
        element.id == 'declineReason'
          ? (formData = {
              ...formData,
              decline_reason: element.value,
            })
          : null;
      }
    );

    const { data, error } = await supabaseClient
      .from('order')
      .update(formData)
      .eq('id', props.id);
    console.log(data);
    if (error) {
      console.log(error.message);
    }
    alert('Submitted successfully');
  };

  return (
    <>
      <Layout
        title={`Order #${workOrder.tracking_id} | Pending | WMS | TuPack`}
      />
      <WOSummary workOrder={workOrder} task={tasks} />
      <SpecificDetails specifics={specifics} workOrder={workOrder} />
      <form onSubmit={handleSubmit}>
        <EstimatedCosts
          task={tasks}
          workOrder={workOrder}
          brands={brands}
        />
      </form>
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
