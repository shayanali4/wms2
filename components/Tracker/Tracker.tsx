import { Pending } from '../Page/Tracker/Pending';

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
            <h4>Work Order Tracker</h4>
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
          <>
            <b>Accepted</b>
            <p>
              We accepted your work order at {props.time_accepted}.
              <ul>
                <li>Estimated time: {props.target_time}mins</li>
                <li>Estimated cost: £{props.initial_cost}</li>
              </ul>
            </p>
            <p>
              We'll update you again when the work order has started.{' '}
            </p>
          </>
        ) : null}
        {props.tracker_status === 2 ? (
          <>
            <b>Started</b>
            <p>
              We expect to complete your work order{' '}
              {props.expected_finish_date}.
              <ul>
                <li>Work Order accepted on: {props.created_at}</li>
                <li>Estimated time: {props.target_time}mins</li>
                <li>Estimated cost: £{props.initial_cost}</li>
              </ul>
            </p>
            <p>
              You'll hear from us again as soon as your work order has
              been completed.{' '}
            </p>
          </>
        ) : null}
        {props.tracker_status === 3 ? (
          <>
            <b>Finished</b>
            <p>
              Your work order was completed at {props.finish_time}.
              <ul>
                <li>Time Taken: {props.time_taken}mins</li>
              </ul>
            </p>
            <h3>Full Details</h3>
            <p>tbc</p>
            <p>Thanks for your order. </p>
          </>
        ) : null}
      </section>
    </div>
  );
}
