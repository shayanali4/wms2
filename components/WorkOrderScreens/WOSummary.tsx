export const WOSummary = (props: any) => {
  return (
    <>
      <h1 className="mb-5">
        {props.workOrder.tracking_id}: Accept / Reject Work Order
      </h1>
      <h2> Summary</h2>
      <ul className="mb-3">
        <li> --- </li>
        <li>
          <b>Task: </b> {props.task.name}
        </li>
        <li>
          <b>Description: </b>
          {props.workOrder.description}
        </li>
        <li>
          <b>Total Units/Quantity: </b>
          {props.workOrder.initial_units_or_quantity}
        </li>
        <li>
          <b>Date Submitted: </b>
          {props ? props.workOrder.created_at : 'not working rn'}
        </li>
      </ul>
      <h2>Contact</h2>
      <ul className="mb-3">
        <li> --- </li>
        <li>
          <b>Brand (Customer Entry): </b>
          {props.workOrder.brand_entry}
        </li>
        <li>
          <b>Customer Name: </b>
          {props.workOrder.name}
        </li>
        <li>
          <b>Email: </b>
          {props.workOrder.email}
        </li>
        <li>
          <b>Phone Number: </b>
          {props.workOrder.number}
        </li>
      </ul>
    </>
  );
};
