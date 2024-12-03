import { Injectable } from '@nestjs/common';
import { UpdateCongregationPayload } from './interfaces/update-congregation.payload';
import { CreateCongregationPayload } from './interfaces/create-congregation.payload';

@Injectable()
export class CongregationsService {
  createCongregation(createCongregationPayload: CreateCongregationPayload) {
    throw new Error('Method not implemented.');
  }
  findCongregationById(id: string) {
    throw new Error('Method not implemented.');
  }
  findAllCongregations() {
    throw new Error('Method not implemented.');
  }
  updateCongregation(updateCongregationPayload: UpdateCongregationPayload) {
    throw new Error('Method not implemented.');
  }
  deleteCongregation(id: string) {
    throw new Error('Method not implemented.');
  }
}
