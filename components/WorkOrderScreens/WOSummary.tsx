export const WOSummary = (props: any) => {
  return (
    <>
      <h1>
        Details for Order:
        {props.workOrder.tracking_id}
      </h1>
      <p>
        Order Id (to delete):
        {props.workOrder.id}
      </p>

      <ul>
        <li> --- </li>
        <li>
          Description
          {props.workOrder.description}
        </li>
        <li>
          Total Units/Quantity:
          {props.workOrder.initial_units_or_quantity}
        </li>
        <li>
          Submitted:
          {props.workOrder.created_at}
        </li>
        <h1>Contact</h1>
        <li>
          Brand (Customer Entry):
          {props.workOrder.brand_entry}
        </li>
        <li>
          Customer Name:
          {props.workOrder.name}
        </li>
        <li>
          Email:
          {props.workOrder.email}
        </li>
        <li>
          Phone Number:
          {props.workOrder.number}
        </li>
      </ul>
    </>
  );
};
