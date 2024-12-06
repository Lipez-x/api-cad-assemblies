import { Members } from '../schemas/members.schema';

export interface Department {
  _id: string;
  name: string;
  leader: string;
  members: Array<Members>;
}
