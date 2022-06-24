import { supabaseClient } from '../../lib/client';

export const fetchAllOrders = async () => {
  const { data } = await supabaseClient.from('order').select('*');
  return data;
};

export const FetchBrands = async () => {
  const { data } = await supabaseClient.from('brands').select('*');
  return data;
};

export const fetchOrdersFilter = async (equalField, value) => {
  const { data } = await supabaseClient
    .from('order')
    .select('*')
    .eq(equalField, value);
  return data;
};

export const fetchWorkTasks = async () => {
  const { data } = await supabaseClient
    .from('work_tasks')
    .select('*');
  return data;
};

export const findSpecificFieldsForOrder = async (orderId) => {
  const { data } = await supabaseClient
    .from('specific_fields')
    .select('*')
    .eq('order_id', orderId)
    .single();
  return data;
};

export const findWorkTask = async (workOrderId) => {
  const { data } = await supabaseClient
    .from('work_tasks')
    .select('*')
    .eq('id', workOrderId)
    .single();
  return data;
};

export const newOrders = async () => {
  const orders = await fetchAllOrders();
  const workTasks = await fetchWorkTasks();
  return { orders, workTasks };
};

export const getTableInformation = async (name) => {
  if (name === 'newOrders') {
    return await newOrders();
  }
};

// orders, work tasks, work task name
