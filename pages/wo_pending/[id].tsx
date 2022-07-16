import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { WOSummary } from '../../components/WorkOrderScreens/WOSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { EstimatedCosts } from '../../components/WorkOrderScreens/EstimatedCosts';
import { supabaseClient } from '../../lib/client';
import { queueOrderAcceptReject } from '../../data/services';
import Button from '../../components/Button';

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState([]);
  const [tasks, setTasks] = useState([{}]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    queueOrderAcceptReject(props.id).then((data: any) => {
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
      if (data.brands) {
        setBrands(data.brands);
      } else {
        console.log('didntwork');
      }
    });
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
      {workOrder && tasks && brands && specifics && (
        <>
          <Button text="Go Back" hyperlink="/" />
          <Layout
            title={`Order #${workOrder.tracking_id} | Pending | WMS | TuPack`}
          />
          <WOSummary order={workOrder} tasks={tasks} />
          <SpecificDetails
            specifics={specifics}
            workOrder={workOrder}
          />
          <form onSubmit={handleSubmit}>
            <EstimatedCosts
              tasks={tasks}
              order={workOrder}
              brands={brands}
            />
          </form>
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
