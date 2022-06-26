export const TimeSummary = (props: any) => {
  return (
    <>
      <h2>Final Timings</h2>
      <p>
        <b>Start Date: </b>
        {props.workOrder.start_time}
      </p>
      <p>
        <b>Expected Finish Date: </b>
        {props.workOrder.expected_finish_date}
      </p>
      <p className="mt-3">
        <b>Target Time: </b> {props.workOrder.target_time} mins
      </p>
      <label htmlFor="timeTaken">Total Time Taken (Askkkk)</label>
      <input
        type="text"
        value={`${props.workOrder.target_time} mins`}
        id="timeTaken"
      />
    </>
  );
};
