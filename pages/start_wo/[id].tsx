import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { QueueSummary } from '../../components/WorkOrderScreens/StartQueue/QueueSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { StartChoices } from '../../components/WorkOrderScreens/StartQueue/StartChoices';
import { ActionStartQueue } from '../../components/WorkOrderScreens/StartQueue/ActionStartQueue';
import { supabaseClient } from '../../lib/client';

const Index: NextPage = (props) => {
  // const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [task, setTask] = useState({});
  const [workers, setWorkers] = useState({});

  useEffect(() => {
    const fetchNewOrders = async () => {
      console.log(props.id);

      const getWorkOrder = async () => {
        const { data } = await supabaseClient
          .from('order')
          .select('*')
          .eq('id', props.id)
          .single();
        console.log(data);
        setWorkOrder(data || {});
      };
      const getSpecifics = async () => {
        const { data } = await supabaseClient
          .from('specific_fields')
          .select('*')
          .eq('order_id', props.id)
          .single();
        console.log(data);
        setSpecifics(data || {});
      };
      const getWorkTask = async () => {
        console.log(Number(workOrder.work_order_id));
        const { data } = await supabaseClient
          .from('work_tasks')
          .select('*')
          .eq('id', Number(workOrder.work_order_id))
          .single();

        console.log(data);
        setTask(data || {});
      };
      const getWorkers = async () => {
        const { data } = await supabaseClient
          .from('worker')
          .select('*');
        console.log(data);
        setWorkers(data || {});
      };
      getWorkOrder();
      getSpecifics();
      getWorkTask();
      getWorkers();
    };
    fetchNewOrders().catch(console.error);
    return () => {
      setWorkOrder({}); // Clean up
      setSpecifics({}); // Clean up
      setTask({}); // Clean up
      setWorkers({}); // Clean up
    };
  }, []);

  return (
    <>
      <Layout title="Queue: Work Order" />
      <QueueSummary workOrder={workOrder} task={task} />
      {'----'}
      <SpecificDetails specifics={specifics} workOrder={workOrder} />
      {'----'}
      {/* add form here */}
      <StartChoices
        workers={workers}
        // workOrder={workOrder}
        // brands={brands}
      />
      {'----'}
      <ActionStartQueue />
      <button id="accept" onClick={() => null}>
        Start Work Order
      </button>
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log('Not started, SSPid: ', id);
  return {
    props: {
      id,
    },
  };
}
