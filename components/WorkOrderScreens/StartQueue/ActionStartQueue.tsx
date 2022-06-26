import { useState } from 'react';
import { RejectWO } from '../AcceptorReject/Options/RejectWO';

export const ActionStartQueue = () => {
  const [WOAction, setWOAction] = useState<'start' | 'reject' | null>(
    null
  );

  return (
    <>
      <h1>Start Work Order</h1>

      <button
        // type="button"
        id="start"
        onClick={() => setWOAction('start')}
      >
        Start Work Order
      </button>

      <button
        // type="button"
        id="reject"
        onClick={() => setWOAction('reject')}
      >
        Reject Work Order
      </button>
      {WOAction === 'reject' ? <RejectWO /> : null}
    </>
  );
};
