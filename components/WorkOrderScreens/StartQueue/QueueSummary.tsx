export const QueueSummary = (props: any) => {
  const { workOrder, tasks } = props;
  return (
    <>
      {workOrder && tasks && (
        <>
          <h1>Queue - Order: #{workOrder.tracking_id}</h1>
          <p>
            Work Order Task:
            {
              'TBCCC'
              // tasks.find(
              //   (task: any) => task.id == workOrder.work_task_id
              // )?.name
            }
          </p>

          <ul>
            <li> --- </li>
            <li>
              Total Units/Quantity:
              {workOrder.initial_units_or_quantity}
            </li>
            <li>Target Time: {workOrder.target_time}</li>
            <li>
              Price:
              {workOrder.initial_cost}
            </li>
            <li>
              Time Accepted:
              {workOrder.time_accepted}
            </li>
            <li>
              Description:
              {workOrder.description}
            </li>
          </ul>
        </>
      )}
    </>
  );
};
