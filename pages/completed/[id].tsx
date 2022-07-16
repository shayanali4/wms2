import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { QueueSummary } from '../../components/WorkOrderScreens/StartQueue/QueueSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { StartChoices } from '../../components/WorkOrderScreens/StartQueue/StartChoices';
import { ActionStartQueue } from '../../components/WorkOrderScreens/StartQueue/ActionStartQueue';
import { startOrder } from '../../data/services';
import { supabaseClient } from '../../lib/client';
import Button from '../../components/Button';
import { CompletedSummary } from '../../components/WorkOrderScreens/Completed/Summary';
import {
  WarehouseNotes,
  WarehouseSummary,
} from '../../components/WorkOrderScreens/Completed/WarehouseNotes';
import { InitialClientDetails } from '../../components/WorkOrderScreens/Completed/InitialClientDetails';

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [tasks, setTasks] = useState({});
  const [workers, setWorkers] = useState({});

  useEffect(() => {
    startOrder(props.id).then((data: any) => {
      console.log(data);
      if (data.order) {
        setWorkOrder(data.order);
      }
      if (data.specificFields) {
        setSpecifics(data.specificFields);
      }
      if (data.workTasks) {
        setTasks(data.workTasks);
      }
      if (data.workers) {
        setWorkers(data.workers);
      }
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = { tracker_status: 2 };

    Array.prototype.forEach.call(
      e.target.elements,
      (element: Element) => {
        console.log(element.id, ' ', element.value);
        element.id == 'declineReason'
          ? (formData = {
              ...formData,
              tracker_status: 99,
              decline_reason: element.value,
            })
          : null;
        element.id == 'startDate'
          ? (formData = { ...formData, start_time: element.value })
          : null;
        element.id == 'estFinishDate'
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
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
    if (data) {
      alert('Submitted successfully');
    }
  };

  return (
    <>
      {workOrder && tasks && workers && specifics && (
        <>
          <Layout
            title={`Order #${workOrder.tracking_id} | Completed Orders | WMS | TuPack`}
          />
          <Button text="Go Back" hyperlink="/completed" />
          <CompletedSummary workOrder={workOrder} tasks={tasks} />
          <WarehouseSummary workOrder={workOrder} />
          <InitialClientDetails
            workOrder={workOrder}
            tasks={tasks}
            specificFields={specifics}
          />
          <SpecificDetails
            specifics={specifics}
            workOrder={workOrder}
          />
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
