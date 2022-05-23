import { QueueObject } from './QueueObject';

export interface NotStartedObject extends QueueObject {
  time_accepted: string;
  brand_id: number;
  assigned_to: number;
  initial_cost: string;
  target_time: number;
}
[];
