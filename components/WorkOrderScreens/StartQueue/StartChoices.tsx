import { useEffect, useState } from 'react';

export const StartChoices = (workers: any) => {
  const [workerss, setWorkerss] = useState([{}]);

  useEffect(() => {
    console.log(workers);
    setWorkerss(workers);
  }, []);
  return (
    <>
      <h1>Complete this to start</h1>

      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" />

      <label htmlFor="assignWorker">Assigned Worker:</label>
      <select value="assignWorker">
        <option
          hidden
          disabled
          defaultValue={'Select a Worker'}
        ></option>
        {/* {workerss.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))} */}
      </select>

      <label htmlFor="startDate">Expected Finish Date:</label>
      <input type="date" id="estFinishDate" />
    </>
  );
};
