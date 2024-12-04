import { Address } from '../schemas/congregations.schema';

export interface CreateCongregationPayload {
  name: string;
  leader: string;
  address: Address;
}
