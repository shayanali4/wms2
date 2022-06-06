import Layout from '../Layout';
import { QueueObject } from '../../interfaces/QueueObject';

export function AcceptWO(props: QueueObject) {
  return (
    <div>
      <h1>Details for Order: {props.tracking_id} </h1>
      <p>Order Id (to delete): {props.id} </p>

      <div>
        <ul>
          <li> ---</li>
          <li>Description {props.description} </li>
          <li>
            Total Units/Quantity:{' '}
            <b>{props.initial_units_or_quantity} </b>
          </li>
          <li>Submitted: {props.created_at} </li>
          <li> ---</li>
        </ul>
      </div>
      <div>
        <h1>Contact</h1>
        <ul>
          <li>Brand (Customer Entry): {props.brand_entry}</li>
          <li>Customer Name: {props.name} </li>
          <li>Email: {props.email} </li>
          <li>Phone Number: {props.number} </li>
        </ul>
      </div>
    </div>
  );
}
