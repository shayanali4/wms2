import { useEffect, useState } from 'react';
import { ActionWO } from './AcceptorReject/ActionWO';

export const EstimatedCosts = (props: any) => {
  const { tasks, order, brands } = props;

  const [targetTime, setTargetTime] = useState(0);
  const [cost, setCost] = useState(0);
  const [brandId, setBrandId] = useState(0);

  useEffect(() => {
    const task = tasks.find((task) => task.id === order.work_task_id);

    if (brandId) {
      const brand = brands.find((b: any) => b.id == brandId);
      if (!task.mins_per_unit && !task.flat_cost) {
        setCost(0);
      } else if (!task.mins_per_unit && task.flat_cost) {
        const flatCostTimeMins = Number(
          (order.initial_units_or_quantity * task.flat_cost).toFixed(
            2
          )
        );
        setCost(flatCostTimeMins);
      } else {
        const flatCostTimeMins = Number(
          (
            order.initial_units_or_quantity *
            task.mins_per_unit *
            (brand.hourly_rate / 60)
          ).toFixed(2)
        );
        setCost(flatCostTimeMins);
      }
    }

    if (order && tasks) {
      if (task && task.name) {
        if (!task.mins_per_unit) {
          setTargetTime(0);
        }
        const taskTimeMins = task.mins_per_unit;
        const tempTargetTime =
          order.initial_units_or_quantity * taskTimeMins;
        setTargetTime(tempTargetTime);
      }
    }
  }, [order, tasks, brandId]);

  const handleBrandSelect = (brandId: number) => {
    setBrandId(brandId);
    // console.log(brands[2].id);
    // const brand = brands.find((b) => b.id === brandId);
    // const brand2 = brands.filter((b) => b.id === brandId)[0];
    // console.log(brand);
    // console.log(brand2);
    // const minsPerUnit = task[order.work_task_id].mins_per_unit;
    // const flatCost = task[order.work_task_id].flat_cost;
    // const quantity = order.initial_units_or_quantity;
    // if (minsPerUnit == null) {
    //   setTargetTime(0);
    // } else {
    //   setTargetTime(minsPerUnit * quantity);
    // }
    // const costRate = brand.hourly_rate;
    // let estimatedCost = (minsPerUnit / 60) * costRate * quantity;
    // if (minsPerUnit == null && flatCost != null) {
    //   setCost(Number(flatCost * quantity.toFixed(2)));
    // } else if (minsPerUnit == null && flatCost == null) {
    //   setCost(0);
    // } else {
    //   estimatedCost = Number(estimatedCost.toFixed(2));
    //   setCost(estimatedCost);
    // }
  };

  return (
    <>
      {tasks && order && brands && (
        <>
          <h2>Calculate Estimated Costs</h2>
          <ul>
            <li> --- </li>
            <li>
              <b>Task: </b>
              {
                tasks.find((task) => task.id === order.work_task_id)
                  ?.name
              }
            </li>
            <li>
              <b>Total Units/Quantity: </b>
              {order.initial_units_or_quantity}
            </li>
            <li>
              <b>Customer's Brand Entry: </b>
              {order.brand_entry}
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
            {brands.map((brand: any) => (
              <option value={brand.id}>{brand.name}</option>
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
      )}
    </>
  );
};
