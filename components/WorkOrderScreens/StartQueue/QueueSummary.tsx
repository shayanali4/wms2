export const QueueSummary = (props: any) => {
  return (
    <>
      <h1>Queue - Order: #{props.workOrder.tracking_id}</h1>
      <p>
        Work Order Task:
        {props.task.name}
      </p>

      <ul>
        <li> Delivery </li>
        <li> --- </li>
        <li>
          Total Units/Quantity:
          {props.workOrder.initial_units_or_quantity}
        </li>
        <li>Target Time: {props.workOrder.target_time}</li>
        <li>
          Price
          {props.workOrder.initial_cost}
        </li>
        <li>
          Time Accepted
          {props.workOrder.time_accepted}
        </li>
        <li>
          Description
          {props.workOrder.description}
        </li>
      </ul>
    </>
  );
};
