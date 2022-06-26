export const AcceptWO = () => {
  return (
    <>
      <label htmlFor="updateTiming">
        <p className="mt-3">Update Target Time (optional)</p>
      </label>
      <input type="text" id="notesEstCostAccepted"></input>
      <button id="updateTiming">Update Timing</button>

      <label htmlFor="updateCosts">
        <p>Update Estimated Cost (optional)</p>
      </label>
      <input type="text" id="notesEstCostAccepted"></input>
      <button id="updateCosts">Update Costs</button>
      <p className="mt-3"></p>

      <p>Any notes to accepting a work order?</p>
      <textarea
        id="notesForCustAccepted"
        placeholder="Add Your notes to share with the customer here..."
      ></textarea>
      <button id="submitAccept">Accept Work Order</button>
    </>
  );
};
