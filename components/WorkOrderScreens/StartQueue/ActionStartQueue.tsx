import { useState } from 'react';

export const ActionStartQueue = () => {
  const [WOAction, setWOAction] = useState<
    'accept' | 'reject' | null
  >(null);

  return (
    <>
      <h1>Accept or reject Work Order</h1>

      <button id="reset" onClick={() => setWOAction('reject')}>
        Reset (to Queue)
      </button>
      <button id="reject" onClick={() => setWOAction('reject')}>
        Reject
      </button>
      {/* {WOAction && WOAction === 'accept' ? <AcceptWO /> : null}
      {WOAction && WOAction === 'reject' ? <RejectWO /> : null} */}
    </>
  );
};
