import { supabaseClient } from '../../lib/client';

export const fetchAllOrders = async () => {
  const { data } = await supabaseClient.from('order').select('*');
  return data;
};
export const fetchOneOrder = async (id) => {
  const { data } = await supabaseClient
    .from('order')
    .select('*')
    .eq('id', id)
    .single();
  return data;
};

export const fetchBrands = async () => {
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

export const fetchNewOrders = async () => {
  const orders = await fetchOrdersFilter('tracker_status', 0);
  const workTasks = await fetchWorkTasks();
  return { orders, workTasks };
};

export const getTableInformation = async (name) => {
  if (name === 'newOrders') {
    return await newOrders();
  }
};

export const getWorkTaskNames = (orders, tasks) => {
  return orders.map((o) => {
    let task_name = tasks[o.work_task_id].name;
    return { ...o, task_name: task_name };
  });
};
