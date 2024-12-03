import { Address } from './congregations.schema';

export interface CreateCongregationPayload {
  name: string;
  leader: string;
  address: Address;
}
