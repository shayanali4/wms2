export const PriceSummary = (props: any) => {
  return (
    <>
      <h1>Order: #{props.workOrder.tracking_id}</h1>
      <p>
        Task:
        {props.task.name}
      </p>
      <p>
        Total Units / Quantity
        {props.workOrder.initial_units_or_quantity}
      </p>
      <p>Enter details to complete work order</p>
    </>
  );
};
