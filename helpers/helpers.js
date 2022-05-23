import brands from '../data/brands';
import workers from '../data/workers';
import workOrders from '../data/workOrders';

export const getWorkOrder = (orderID) => {
  let workOrder = workOrders.filter((wo) => wo.id === orderID)[0];
  return workOrder && workOrder.name ? workOrder.name : null;
};

export const getBrandName = (brandID) => {
  let brand = brands.filter((brand) => brand.id === brandID)[0];
  return brand && brand.name ? brand.name : null;
};

export const getWorkerName = (workerID) => {
  let worker = workers.filter((worker) => worker.id === workerID)[0];
  return worker && worker.name ? worker.name : null;
};
