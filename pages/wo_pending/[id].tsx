import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { WOSummary } from "../../components/WorkOrderScreens/WOSummary";
import { SpecificDetails } from "../../components/WorkOrderScreens/SpecificDetails";
import { EstimatedCosts } from "../../components/WorkOrderScreens/EstimatedCosts";
import { ActionWO } from "../../components/WorkOrderScreens/AcceptorReject/ActionWO";
import { supabaseClient } from "../../lib/client";

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [specifics, setSpecifics] = useState(null);
  const [task, setTask] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetchNewOrders = async () => {
      const getWorkOrder = async () => {
        const { data } = await supabaseClient
          .from("order")
          .select("*")
          .eq("id", props.id)
          .single();
        setWorkOrder(data);
      };
      const getSpecifics = async () => {
        const { data } = await supabaseClient
          .from("specific_fields")
          .select("*")
          .eq("order_id", props.id)
          .single();
        setSpecifics(data);
      };
      const getBrands = async () => {
        const { data } = await supabaseClient.from("brands").select("*");
        setBrands(data);
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

  return (
    <>
      {workOrder && task && brands && specifics && (
        <>
          <Layout title="Work order title tbc" />
          <WOSummary workOrder={workOrder} task={task} />
          <SpecificDetails specifics={specifics} workOrder={workOrder} />
          {/* add form here */}
          <EstimatedCosts task={task} workOrder={workOrder} brands={brands} />
          <ActionWO />
        </>
      )}
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
