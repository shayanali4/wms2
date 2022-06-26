export const PricingSummary = (props: any) => {
  return (
    <>
      <h2>Final Pricing</h2>
      <p>
        <b>Initial Price Quoted: </b>£{props.workOrder.initial_cost}
      </p>
      <p>
        <b>Total Units / Quantity: </b>
        {props.workOrder.initial_units_or_quantity}
      </p>
      <p>
        <b>Price Per Unit: </b>
        TBCC
        {/* {props.workOrder.expected_finish_date} */}
      </p>

      <label className="mt-3" htmlFor="finalPrice">
        <h2>Final Price</h2>
      </label>
      <input
        type="text"
        value={`£${props.workOrder.initial_cost}`}
        id="finalPrice"
      />
      <label className="mt-3" htmlFor="finalUnits">
        <h2>Final number of Units / Total Quantity</h2>
      </label>
      <input
        type="text"
        value={`${props.workOrder.initial_units_or_quantity}`}
        id="finalUnits"
      />
    </>
  );
};
