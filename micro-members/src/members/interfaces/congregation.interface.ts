import { Members } from '../schemas/members.schema';

export interface Congregation {
  name: string;
  leader: string;
  address: string;
  members: Array<Members>;
}
