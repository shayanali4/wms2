export const AcceptWO = () => {
  return (
    <>
      <p>
        <b>Estimated Costs to complete Work Order: </b>TBC
      </p>
      <p>
        <b>Add new costs? </b>
      </p>
      <p>Enter New Estimated Cost</p>
      <input
        type="text"
        id="notesEstCostAccepted"
        placeholder="Enter new Est cost here"
      ></input>
      <button id="updateCosts">Update Costs</button>
      <p className="mt-3">
        <b>Estimated Time to complete Work Order: </b>TBC
      </p>
      <p>
        <b>Update Estimated Time? </b>
      </p>
      <p>Enter New Estimated Time</p>
      <button id="updateTiming">Update Timing</button>

      <label htmlFor="updateTiming">
        <p>Any notes to add?</p>
      </label>
      <textarea
        id="notesForCustAccepted"
        placeholder="Add Your notes to share with the customer here"
      ></textarea>
      <button id="submitAccept">Accept Work Order</button>
    </>
  );
};
