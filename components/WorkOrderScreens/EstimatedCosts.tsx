import { useEffect, useState } from 'react';

export const EstimatedCosts = (props: any) => {
  const task = props.task;
  const workOrder = props.workOrder;
  const brands = props.brands;

  const [targetTime, setTargetTime] = useState(0);
  const [estCost, setEstCost] = useState(0);

  console.log(props);

  const [workOrders, setWorkOrders] = useState([{}]);

  useEffect(() => {
    console.log(workOrder.id);
    // setWorkOrders()

    const targetTime =
      workOrder.initial_units_or_quantity * task.mins_per_unit;
    // console.log(targetTime);
    // setTargetTime(targetTime);
  }, [props]);

  const handleBrandSelect = (input: any) => {
    const brand = brands.filter((b) => b.id == input)[0];
    const minsPerUnit = task[workOrder.work_task_id].mins_per_unit;
    // const flatCost //do refactor
    const quantity = workOrder.initial_units_or_quantity;
    setTargetTime(minsPerUnit * quantity);
    const costRate = brand.hourly_rate;
    let estimatedCost = (minsPerUnit / 60) * costRate * quantity;
    estimatedCost = Number(estimatedCost.toFixed(2));
    setEstCost(estimatedCost);
  };

  return (
    <>
      <h2>Calculate Estimated Costs</h2>
      <ul>
        <li> --- </li>
        <li>
          <b>Work Order: </b>
          {task.work_order_name}
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
          {' '}
          Match the Customer's Brand here to display costs
        </h3>
      </label>
      <select
        name="brands"
        id="brands"
        onChange={(e) => handleBrandSelect(e.target.value)}
      >
        <option hidden disabled selected>
          Select a Brand
        </option>
        {brands
          ?.sort(function (a, b) {
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
          ))}
      </select>
      <ul>
        <li>
          <b>Target Time: </b> {targetTime} minutes
        </li>
        <li>
          <b>Estimated Costs: </b> £{estCost}
        </li>
      </ul>
    </>
  );
};
