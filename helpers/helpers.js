import brands from '../data/brands';
import workOrders from '../data/workOrders';

export const getWorkOrder = (orderID) => {
  return workOrders.filter((wo) => wo.id === orderID)[0].name || null;
};

export const getBrandName = (brandID) => {
  return (
    brands.filter((brand) => brand.id === brandID)[0].name || null
  );
};
