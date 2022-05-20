import { useState } from 'react';
import newOrders from '../data/newOrders';

// const initFunction = (id) => {
//   try {
//     const ans = getOrder(id);
//     console.log(ans);
//     return ans;
//   } catch (error) {
//     alert('Something went wrong!');
//     console.log(error.message);
//   } finally {
//     console.log('initialised done');
//   }
// };

// const workOrderObject = useState([]);

const getOrder = (id) => {
  console.log(newOrders[0].order_id);

  const order = newOrders.filter((order) => order.order_id == id);
  console.log(order);
  return order;
};

const WorkOrder = ({ id, pathname }) => {
  //replace w state 2 load into
  console.log(id);
  const wOrderObj = getOrder(id);

  return (
    <div className>
      <ul>
        <li>Order Number: {wOrderObj.order_num} </li>
        <li>Work Order: {wOrderObj.work_order_name} </li>
        <li>
          Total Units/Quantity: {wOrderObj.initial_units_or_quantity}{' '}
        </li>
        <li>Description: {wOrderObj.description} </li>
        <li>---</li>
      </ul>
      <h3>Specific Details</h3>
      <ul>
        {/* load specific fields based on work order name */}
        {/* might need to save html templates in this file, as components */}
        {/* Compnts: break into type of form entry and size of field needed */}
        <li>
          {wOrderObj.collection_address
            ? wOrderObj.collection_address
            : 'Address not found'}
        </li>
      </ul>
      <h3>Contact</h3>
      <ul>
        <li>Brand: {wOrderObj.brand_entry}</li>
        <li>Customer Name: {wOrderObj.name}</li>
        <li>Email: {wOrderObj.email}</li>
        <li>Contact Number: {wOrderObj.number}</li>
        <li>---</li>
      </ul>
      {/* add brand costs data here */}
      <h3>Calculate Estimated Costs</h3>
      <ul>
        <li>Customer's Brand Entry: {wOrderObj.brand_entry}</li>
        {/* add list of brands here */}
        <li>Choose list of brands</li>
        <li>Estimated Costs</li>
        <li>Target Time</li>
        <li>Contact Number: {wOrderObj.number}</li>
        <li>---</li>
      </ul>
      <h3>Accept or Reject Work Order</h3>
      {/* make sure brand chosen from list */}
      <button> Accept </button>
      <button> Reject </button>
      <ul>
        <li>Accepted</li>
        {/* target time = mins per unit x num of units */}
        <li>Target Time</li>
        <li>Update Target Time</li>
        <li>Estimated Costs</li>
        <li>Update Estimated Costs</li>
        <button> Submit </button>
        <li>---</li>
      </ul>
      <ul>
        <li>Rejected</li>
        {/* target time = mins per unit x num of units */}
        <p>
          Have you phoned the customer to get all the information
          needed to complete? Have you pre-warned the customer that
          you will need to decline the work order?
        </p>
        <h4>Enter reason for rejecting work order:</h4>
        <textarea></textarea>
        <button> Submit </button>
        <li>---</li>
      </ul>
    </div>
  );
};

export default WorkOrder;
