import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { supabaseClient } from '../../lib/client';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';
import {
  fetchOneOrder,
  fetchWorkTasks,
  findSpecificFieldsForOrder,
} from '../../data/services';
import S3UploadFile from '../../components/s3UploadFile';

const FinishIndex: NextPage = (props) => {
  // const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [task, setTasks] = useState({});

  useEffect(() => {
    const fetchWIPOrder = async () => {
      console.log(props.id);
      const order = await fetchOneOrder(props.id);
      setWorkOrder(order || {});
      const specificFields = await findSpecificFieldsForOrder(
        props.id
      );
      setSpecifics(specificFields || {});
      const workTasks = await fetchWorkTasks();
      setTasks(workTasks || {});
    };
    fetchWIPOrder().catch(console.error);
    return () => {
      setWorkOrder({});
      setSpecifics({});
      setTasks({});
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = { tracker_status: 3 };

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
        // element.id == 'QCPics'
        //   ? (
        //     //tbc
        //     if(element.files) {
        //       interface File {
        //         name: string;
        //       }
        //       [...element.files].forEach((file: File) => {
        //         S3UploadFile(file, emailAd);
        //         pics.push(
        //           `https://wmspics.s3.amazonaws.com/${emailAd}/${file.name}`
        //         );
        //       });
        //     }

        //     formData = {
        //       ...formData,
        //       expected_finish_date: element.value,
        //     })
        //   : null;
      }
    );

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
      <FinishSummary workOrder={workOrder} task={task} />
      <form onSubmit={handleSubmit}>
        <TimeSummary workOrder={workOrder} />
        <PricingSummary workOrder={workOrder} />
        {/* <SpecificDetails specifics={specifics} workOrder={workOrder} /> */}
        <FinishWO />
      </form>
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
