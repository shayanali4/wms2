export declare type QueueObject = {
  id?: number;
  tracking_id?: string;
  tracker_status_id?: number;
  work_order_id?: number;
  created_at?: string;
  description?: string;
  initial_units_or_quantity?: number;
  brand_entry?: string;
  skus?: string[];
  pics?: string[];
  name?: string;
  email?: string;
  phone_number?: string;
  [otherOptions: string]: unknown;
}[];
