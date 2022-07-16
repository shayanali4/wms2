import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';
import {
  fetchOneOrder,
  fetchWorkTasks,
  findSpecificFieldsForOrder,
} from '../../data/services';
import S3UploadFile from '../../components/s3UploadFile';
import Button from '../../components/Button/';

interface File {
  name: string;
}

const FinishIndex: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [specifics, setSpecifics] = useState({});
  const [task, setTasks] = useState({});

  useEffect(() => {
    const fetchWIPOrder = async () => {
      console.log(props.id);
      const order = await fetchOneOrder(props.id);
      if (order) {
        setWorkOrder(order || {});
      }
      const specificFields = await findSpecificFieldsForOrder(
        props.id
      );
      if (specificFields) {
        setSpecifics(specificFields || {});
      }
      const workTasks = await fetchWorkTasks();
      if (workTasks) {
        setTasks(workTasks || {});
      }
    };
    fetchWIPOrder().catch(console.error);
    return () => {
      // setWorkOrder({});
      // setSpecifics({});
      // setTasks({});
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = { tracker_status: 3 };
    let QCPics = [];
    const emailAd = workOrder.email;

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
        element.id == 'timeTaken'
          ? (formData = { ...formData, start_time: element.value })
          : null;
        element.id == 'finishTime'
          ? (formData = { ...formData, finish_time: element.value })
          : null;
        element.id == 'finalPrice'
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        element.id == 'finalUnits'
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        element.id == 'finalComments' && element.value.length > 1
          ? (formData = {
              ...formData,
              expected_finish_date: element.value,
            })
          : null;
        if (element.id == 'QCPics') {
          if (element.files) {
            [...element.files].forEach((file: File) => {
              S3UploadFile(file, emailAd);
              QCPics.push(
                `https://wmspics.s3.amazonaws.com/${emailAd}/qc/${file.name}`
              );
            });
          }
        }
        // formData = {
        //   ...formData,
        //   qc_pics: QCPics
        // };
        QCPics.length > 0 ? (formData['qc_pics'] = QCPics) : null;
      }
    );

    // make receipt

    // const { data, error } = await supabaseClient
    //   .from('order')
    //   .update(formData)
    //   .eq('id', props.id);
    // console.log(data);
    // if (error) {
    //   console.log(error.message);
    // }
    // if (data) {
    //   alert('Submitted successfully');
    // }
  };

  return (
    <>
      <Layout title={`Complete WO`} />
      <Button text="Go Back" hyperlink="/wip" />
      <FinishSummary workOrder={workOrder} task={task} />
      <form onSubmit={handleSubmit}>
        <TimeSummary workOrder={workOrder} />
        <PricingSummary workOrder={workOrder} />
        <SpecificDetails
          specifics={specifics}
          workOrder={workOrder}
        />
        <FinishWO />
      </form>
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
