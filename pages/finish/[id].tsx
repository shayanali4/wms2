import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FinishSummary } from '../../components/WorkOrderScreens/Finish/FinishSummary';
import { finishOrder } from '../../data/services';
import S3UploadFile from '../../components/s3UploadFile';
import Button from '../../components/Button/';
import { WorkOrder } from '../../interfaces/WorkOrder';
import { TimeSummary } from '../../components/WorkOrderScreens/Finish/TimeSummary';
import { FinishWO } from '../../components/WorkOrderScreens/Finish/FinishWO';
import { PricingSummary } from '../../components/WorkOrderScreens/Finish/PricingSummary';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';

interface File {
  name: string;
}

const FinishIndex: NextPage = (props: any) => {
  const [workOrder, setWorkOrder] = useState<WorkOrder>({
    email: '',
  });
  const [specifics, setSpecifics] = useState({});
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    finishOrder(props.id).then((data: any) => {
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
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData: WorkOrder = { tracker_status: 3 };
    let QCPics: any = [];
    const emailAd = workOrder ? workOrder.email : '';

    Array.prototype.forEach.call(
      e.target.elements,
      (element: any) => {
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
        QCPics.length > 0 ? (formData['qc_pics'] = QCPics) : null;
      }
    );
  };

  return (
    <>
      {workOrder && specifics && tasks && (
        <>
          {console.log(workOrder, specifics, tasks)}
          <Layout title={`Complete WO`} />
          <Button text="Go Back" hyperlink="/wip" />
          <FinishSummary workOrder={workOrder} tasks={tasks} />
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
      )}
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
