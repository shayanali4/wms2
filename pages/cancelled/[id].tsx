import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { SpecificDetails } from '../../components/WorkOrderScreens/SpecificDetails';
import { getAllOrderData } from '../../data/services';
import Button from '../../components/Button';
import { CompletedSummary } from '../../components/WorkOrderScreens/Completed/Summary';
import { WarehouseSummary } from '../../components/WorkOrderScreens/Completed/WarehouseNotes';
import { InitialClientDetails } from '../../components/WorkOrderScreens/Completed/InitialClientDetails';

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [tasks, setTasks] = useState({});
  const [workers, setWorkers] = useState({});

  useEffect(() => {
    getAllOrderData(props.id).then((data: any) => {
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