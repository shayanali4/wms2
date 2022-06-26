import { useState } from 'react';
import { RejectWO } from '../AcceptorReject/Options/RejectWO';

export const FinishWO = () => {
  const [WOReject, setWOReject] = useState<true | false>(false);
  return (
    <>
      <label htmlFor="finalComments">
        <h2>Add Comments</h2>
      </label>
      <strong>
        (Optional) You must contact the customer to make sure they are
        aware of any changes.
      </strong>
      <textarea
        id="finalComments"
        placeholder="Enter final notes to share with the customer here"
      ></textarea>
      <label htmlFor="QCPics">
        <h2>Add Supporting Pictures</h2>
      </label>
      <input id="QCPics" type="file" multiple accept="image/*" />

      <button className="mb-10" id="finishWO">
        <span className="group-hover:text-gray-700">
          Complete Work Order
        </span>
      </button>

      <button
        type="button"
        id="reject"
        onClick={() => setWOReject(true)}
      >
        Reject Work Order
      </button>
      {WOReject ? <RejectWO /> : null}
    </>
  );
};
