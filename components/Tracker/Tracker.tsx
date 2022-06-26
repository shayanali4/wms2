interface Props {
  id: String;
  created_at: Date;
  order_finish_time: String;
  tracker_status: Number;
  tracking_id: string;
  decline_reason: string;
  time_accepted: Date;
  expected_finish_date: Date;
  finish_time: Date;
  time_taken: Number;
}

export function Tracker(props: Props) {
  return (
    <div className="Container">
      <section className="root">
        <figure>
          <figcaption>
            <h4>Tracking Details</h4>
            <h6>Order Number</h6>
            <h2># {props.tracking_id}</h2>
          </figcaption>
        </figure>

        <h1>Current Status</h1>
        {props.tracker_status === 99 ? (
          <p>
            <b>Rejected</b> due to {props.decline_reason}{' '}
          </p>
        ) : null}

        {props.tracker_status === 0 ? (
          <p>
            <b>Pending</b> We've received your work order @
            {props.created_at} and will let you know when next steps
            are ready.
          </p>
        ) : null}
        {props.tracker_status === 1 ? (
          <p>
            <b>Accepted</b> We accepted your work order @{' '}
            {props.time_accepted} We'll update you again when the work
            order has started{' '}
          </p>
        ) : null}
        {props.tracker_status === 2 ? (
          <p>
            <b>Started</b> We expect to complete your work order @{' '}
            {props.expected_finish_date} We'll let you know when this
            is done{' '}
          </p>
        ) : null}
        {props.tracker_status === 3 ? (
          <p>
            <b>Finished</b> Your work order was completed at{' '}
            {props.finish_time} and it took {props.time_taken}. Click
            here to view detials and print a receipt{' '}
          </p>
        ) : null}
      </section>
    </div>
  );
}
