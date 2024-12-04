import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departments } from './interfaces/departments.schema';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel('Departments')
    private readonly departmentsModel: Model<Departments>,
  ) {}
}
