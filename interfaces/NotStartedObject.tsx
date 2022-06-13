import { QueueObject } from './QueueObject';

export interface NotStartedObject extends QueueObject {
  time_accepted: string;
  brand_id: number;
  assigned_to: number;
  initial_cost: string;
  target_time: number;
  tracking_id:string
  id:number
  initial_units_or_quantity:number
};
