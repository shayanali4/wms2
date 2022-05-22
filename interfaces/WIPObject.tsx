import { NotStartedObject } from './NotStartedObject';

export interface WIPObject extends NotStartedObject {
  start_time: string;
  expected_finish_date: string;
  assigned_to: number;
}
