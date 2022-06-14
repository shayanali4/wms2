export const TimeSummary = (props: any) => {
  console.log(props);
  return (
    <>
      <h1>
        Time taken to complete
        {props.workOrder.tracking_id}
      </h1>
      <p>
        Start Date:
        {props.task.work_order_name}
      </p>
      <p>
        Finish Date:
        {props.task.work_order_name}
      </p>
      <p>
        Total Time Taken:
        {props.task.work_order_name}
      </p>
      <p>
        Target Time:
        {props.task.work_order_name}
      </p>
    </>
  );
};
