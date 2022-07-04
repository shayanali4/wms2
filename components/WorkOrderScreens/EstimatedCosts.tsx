import { useEffect, useState } from "react";

export const EstimatedCosts = (props: any) => {
  const [targetTime, setTargetTime] = useState(0);
  const [cost, setCost] = useState(0);
  const [brand, setBrand] = useState({});
  const { task, workOrder, brands } = props;

  useEffect(() => {
    if (brand) {
      const tempTargetTime =
        workOrder.initial_units_or_quantity * task.mins_per_unit;
      setTargetTime(tempTargetTime);
      let tempCost = 0;
      if (task.mins_per_unit) {
        tempCost =
          task.mins_per_unit *
          (brand.hourly_rate / 60) *
          workOrder.initial_units_or_quantity;
        setCost(tempCost);
      } else {
        tempCost = task.flat_cost * workOrder.initial_units_or_quantity;
        setCost(tempCost);
      }
      if (task.name === "Barcoding/ Labelling") {
        tempCost = brand.rebarcoding_rate * workOrder.initial_units_or_quantity;
        setCost(tempCost);
      }
    }
  }, [workOrder, task, brand]);

  return (
    <>
      <h2>Calculate Estimated Costs</h2>
      <ul>
        <li> --- </li>
        <li>
          <b>Work Order: </b>
          {task.name}
        </li>
        <li>
          <b>Total Units/Quantity: </b>
          {workOrder.initial_units_or_quantity}
        </li>
        <li>
          <b>Customer's Brand Entry: </b>
          {workOrder.brand_entry}
        </li>
      </ul>
      <label htmlFor="brand_system">
        <h3 className="mt-3">
          {" "}
          Match the Customer's Brand here to display costs
        </h3>
      </label>
      <select
        name="brands"
        id="brands"
        onChange={(e) => setBrand(e.target.value)}
        value={brand}
      >
        <option hidden disabled value="">
          Select a Brand
        </option>
        {brands.map((brand) => (
          <option value={brand}>{brand.name}</option>
        ))}
        {/* {props.brands
          .sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))} */}
      </select>
      <ul>
        <li>
          <b>Target Time: </b> {targetTime}
        </li>
        <li>
          <b>Estimated Costs: </b> £{cost}
        </li>
      </ul>
    </>
  );
};
