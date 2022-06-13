import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { WOSummary } from '../../components/WorkOrderScreens/WOSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { EstimatedCosts } from '../../components/WorkOrderScreens/EstimatedCosts';
import { ActionWO } from '../../components/WorkOrderScreens/AcceptorReject/ActionWO';
import { supabaseClient } from '../../lib/client';

const Index: NextPage = (props) => {
  // const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [task, setTask] = useState({});
  const [brands, setBrands] = useState({});

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
      const getBrands = async () => {
        const { data } = await supabaseClient
          .from('brands')
          .select('*');
        console.log(data);
        setBrands(data || {});
      };
      getWorkOrder();
      getSpecifics();
      getWorkTask();
      getBrands();
    };
    fetchNewOrders().catch(console.error);
    return () => {
      setWorkOrder({}); // Clean up
      setSpecifics({}); // Clean up
      setTask({}); // Clean up
      setBrands({}); // Clean up
    };
  }, []);

  return (
    <>
      <Layout title="Work order title tbc" />
      <WOSummary workOrder={workOrder} />
      {'----'}
      <SpecificDetails specifics={specifics} workOrder={workOrder} />
      {'----'}
      {/* add form here */}
      <EstimatedCosts
        task={task}
        workOrder={workOrder}
        brands={brands}
      />
      {'----'}
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
