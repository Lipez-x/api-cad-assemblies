import { Address } from './congregations.schema';

export interface UpdateCongregationPayload {
  id: string;
  updateCongregationDto: {
    name: string;
    leader: string;
    address: Address;
  };
}
