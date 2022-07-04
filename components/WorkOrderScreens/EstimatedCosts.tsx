import { useEffect, useState } from 'react';
import { ActionWO } from './AcceptorReject/ActionWO';

export const EstimatedCosts = (props: any) => {
  const task = props.task;
  const workOrder = props.workOrder;
  const brands = props.brands;

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
        tempCost =
          task.flat_cost * workOrder.initial_units_or_quantity;
        setCost(tempCost);
      }
      if (task.name === 'Barcoding/ Labelling') {
        tempCost =
          brand.rebarcoding_rate *
          workOrder.initial_units_or_quantity;
        setCost(tempCost);
      }
    }
  }, [workOrder, task, brand]);

  const handleBrandSelect = (input: any) => {
    const brand = brands.filter((b) => b.id == input)[0];
    const minsPerUnit = task[workOrder.work_task_id].mins_per_unit;
    const flatCost = task[workOrder.work_task_id].flat_cost;
    const quantity = workOrder.initial_units_or_quantity;
    if (minsPerUnit == null) {
      setTargetTime(0);
    } else {
      setTargetTime(minsPerUnit * quantity);
    }
    const costRate = brand.hourly_rate;
    let estimatedCost = (minsPerUnit / 60) * costRate * quantity;
    if (minsPerUnit == null && flatCost != null) {
      setCost(Number(flatCost * quantity.toFixed(2)));
    } else if (minsPerUnit == null && flatCost == null) {
      setCost(0);
    } else {
      estimatedCost = Number(estimatedCost.toFixed(2));
      setCost(estimatedCost);
    }
  };

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
          {' '}
          Match the Customer's Brand here to get estimates
        </h3>
      </label>
      <select
        name="brands"
        id="brands"
        onChange={(e) => handleBrandSelect(e.target.value)}
      >
        <option hidden disabled value="">
          Select a Brand
        </option>
        {brands.map((brand) => (
          <option value={brand}>{brand.name}</option>
        ))}
      </select>
      <ul>
        <li>
          <b>Target Time: </b> {targetTime} minutes
        </li>
        <li>
          <b>Estimated Costs: </b> £{cost}
        </li>
      </ul>
      <ActionWO targetTime={targetTime} estCost={cost} />
    </>
  );
};
