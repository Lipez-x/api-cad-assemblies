import { Injectable } from '@nestjs/common';
import { UpdateCongregationPayload } from './interfaces/update-congregation.payload';
import { CreateCongregationPayload } from './interfaces/create-congregation.payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Congregation } from './interfaces/congregations.schema';

@Injectable()
export class CongregationsService {
  constructor(
    @InjectModel('Congregations')
    private readonly congregationsModel: Model<Congregation>,
  ) {}

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
