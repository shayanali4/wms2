export const AcceptWO = () => {
  return (
    <>
      <p>
        <b>Estimated Costs: </b>£15
      </p>
      <p>
        <b>Add new costs? </b>
      </p>
      <button id="updateCosts">Update Costs</button>
      <p>Enter New Estimated Cost</p>
      <input
        type="text"
        id="notesEstCostAccepted"
        placeholder="Enter new Est cost here"
      ></input>
      <p>
        <b>Estimated Time: </b>60 mins
      </p>
      <p>
        <b>Update Estimated Time? </b>
      </p>
      <button id="updateTiming">Update Timing</button>
      <p>Enter New Estimated Time</p>
      <textarea
        id="notesForCustAccepted"
        placeholder="Add Your notes to share with the customer here"
      ></textarea>
    </>
  );
};
