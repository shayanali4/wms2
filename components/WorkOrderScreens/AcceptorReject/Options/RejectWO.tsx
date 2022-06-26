export const RejectWO = () => {
  return (
    <>
      <p>
        Have you phoned the customer to get all the information needed
        to complete?
      </p>
      <input type="checkbox" id="phonedCustBoolean" required />
      <p>
        Have you pre-warned the customer that you will need to decline
        the work order?
      </p>
      <input type="checkbox" id="warnedCustBoolean" required />

      <p>Why are you rejecting the work order?</p>
      <textarea
        id="declineReason"
        placeholder="Add Your reasoning to inform the customer of the rejection here"
        required
      ></textarea>
      <button id="submitReject">Reject Work Order</button>
    </>
  );
};
