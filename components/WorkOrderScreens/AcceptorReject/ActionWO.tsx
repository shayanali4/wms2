import { useState } from 'react';
import { AcceptWO } from './Options/AcceptWO';
import { RejectWO } from './Options/RejectWO';

export const ActionWO = () => {
  const [WOAction, setWOAction] = useState<
    'accept' | 'reject' | null
  >(null);

  return (
    <>
      <h1>Accept or reject Work Order</h1>
      <button id="accept" onClick={() => setWOAction('accept')}>
        Accept
      </button>
      <button id="reject" onClick={() => setWOAction('reject')}>
        Reject
      </button>
      {WOAction && WOAction === 'accept' ? <AcceptWO /> : null}
      {WOAction && WOAction === 'reject' ? <RejectWO /> : null}
    </>
  );
};
