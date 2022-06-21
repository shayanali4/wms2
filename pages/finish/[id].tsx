import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { EstimatedCosts } from '../../components/WorkOrderScreens/EstimatedCosts';
import { ActionWO } from '../../components/WorkOrderScreens/AcceptorReject/ActionWO';
import { supabaseClient } from '../../lib/client';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { PriceSummary } from '../../components/WorkOrderScreens/Finish/PriceSummary';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';

const FinishIndex: NextPage = (props) => {
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
        console.log(workOrder.work_order_id);
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
      <Layout title={`Complete WO`} />
      <FinishSummary workOrder={workOrder} task={task} />
      {'----'}
      <TimeSummary workOrder={workOrder} />
      <PricingSummary workOrder={workOrder} />
      {/* <PriceSummary workOrder={workOrder} task={task} /> */}
      {/* <SpecificDetails specifics={specifics} workOrder={workOrder} /> */}
      <FinishWO />
      <button className="mb-10" id="finishWO">
        <span className="group-hover:text-gray-700">
          Complete Work Order
        </span>
      </button>
    </>
  );
};

export default FinishIndex;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log('Finish SSPid: ', id);
  return {
    props: {
      id,
    },
  };
}
