import { useEffect, useState } from 'react';

export const StartChoices = (props: any) => {
  // const [targetTime, setTargetTime] = useState(0);
  // const [brand, setBrand] = useState(null);

  // useEffect(() => {
  //   const targetTime =
  //     workOrder.initial_units_or_quantity * task.mins_per_unit;
  //   console.log(targetTime);
  //   setTargetTime(targetTime);
  // }, []);

  return (
    <>
      <h1>Complete this to start</h1>

      <label htmlFor="startDate">Start Date:</label>
      <input type="date" value="startDate" />

      <label htmlFor="assignWorker">Assigned Worker:</label>
      <select value="assignWorker" />

      <label htmlFor="startDate">Expected Finish Date:</label>
      <input type="date" value="expectedFinishDate" />
    </>
  );
};
