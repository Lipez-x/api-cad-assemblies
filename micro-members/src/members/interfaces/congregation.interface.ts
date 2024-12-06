import { Members } from '../schemas/members.schema';

export interface Congregation {
  _id: string;
  name: string;
  leader: string;
  address: string;
  members: Array<Members>;
}
