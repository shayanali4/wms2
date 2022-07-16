export const FinishSummary = (props: any) => {
  const { workOrder, tasks } = props;

  return (
    <>
      {workOrder && tasks && (
        <>
          <h1>Finish Order: #{workOrder.tracking_id}</h1>
          <p>
            Task:
            {
              // 'TBCCC'
              tasks.find(
                (task: any) => task.id == workOrder.work_task_id
              )?.name
            }
          </p>
          <p>
            Total Units / Quantity:{' '}
            {workOrder.initial_units_or_quantity}
          </p>
        </>
      )}
    </>
  );
};
