export const FinishSummary = (props: any) => {
  console.log(props);
  return (
    <>
      <h1>Finish Order: #{props.workOrder.tracking_id}</h1>
      <p>
        Task:
        {props.task.work_order_name}
      </p>
      <p>
        Total Units / Quantity:{' '}
        {props.workOrder.initial_units_or_quantity}
      </p>
    </>
  );
};
