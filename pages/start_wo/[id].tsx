import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { QueueSummary } from "../../components/WorkOrderScreens/StartQueue/QueueSummary";
import { SpecificDetails } from "../../components/WorkOrderScreens/SpecificDetails";
import { StartChoices } from "../../components/WorkOrderScreens/StartQueue/StartChoices";
import { ActionStartQueue } from "../../components/WorkOrderScreens/StartQueue/ActionStartQueue";
import { supabaseClient } from "../../lib/client";

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [specifics, setSpecifics] = useState(null);
  const [task, setTask] = useState(null);
  const [workers, setWorkers] = useState(null);

  useEffect(() => {
    const fetchNewOrders = async () => {
      const getWorkOrder = async () => {
        const { data } = await supabaseClient
          .from("order")
          .select("*")
          .eq("id", props.id)
          .single();
        setWorkOrder(data || {});
      };
      const getSpecifics = async () => {
        const { data } = await supabaseClient
          .from("specific_fields")
          .select("*")
          .eq("order_id", props.id)
          .single();
        setSpecifics(data || {});
      };

      const getWorkers = async () => {
        const { data } = await supabaseClient.from("workers").select("*");
        setWorkers(data||[]);
      };
      getWorkOrder();
      getSpecifics();
      getWorkers();
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

      setTask(data || {});
    };
    if (workOrder) {
      getWorkTask();
    }
  }, [workOrder]);

  return (
    <>
      {workOrder && task && specifics && (
        <>
          <Layout title="Queue: Work Order" />
          <QueueSummary workOrder={workOrder} task={task} />
          {"----"}
          <SpecificDetails specifics={specifics} workOrder={workOrder} />
          {"----"}
          {/* add form here */}
          <StartChoices
            workers={workers}

          />
          {"----"}
          <ActionStartQueue />
          <button id="accept" onClick={() => null}>
            Start Work Order
          </button>
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
