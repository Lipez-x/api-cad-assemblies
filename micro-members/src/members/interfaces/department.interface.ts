import { Members } from '../schemas/members.schema';

export interface Department {
  name: string;
  leader: string;
  members: Array<Members>;
}
