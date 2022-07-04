import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { supabaseClient } from '../../lib/client';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';

const FinishIndex: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [specifics, setSpecifics] = useState({});
  const [task, setTask] = useState(null);
  const [brands, setBrands] = useState({});

  useEffect(() => {
    const fetchNewOrders = async () => {

      const getWorkOrder = async () => {
        const { data } = await supabaseClient
          .from('order')
          .select('*')
          .eq('id', props.id)
          .single();
        setWorkOrder(data || {});
      };
      const getSpecifics = async () => {
        const { data } = await supabaseClient
          .from('specific_fields')
          .select('*')
          .eq('order_id', props.id)
          .single();
        setSpecifics(data || {});
      };

      const getBrands = async () => {
        const { data } = await supabaseClient
          .from('brands')
          .select('*');
        setBrands(data || {});
      };
      getWorkOrder();
      getSpecifics();
      getBrands();
    };
    fetchNewOrders().catch(console.error);

  }, []);

  useEffect(() => {
    const getWorkTask = async () => {
      const { data } = await supabaseClient
        .from("work_tasks")
        .select("*")
        .eq("id", workOrder.work_task_id)
        .single();
      setTask(data);
    };
    if (workOrder) {
      getWorkTask();
    }
  }, [workOrder]);

  useEffect
  return (
    <>
      {workOrder && task &&
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
      </>}
      </>
  );
};

export default FinishIndex;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
