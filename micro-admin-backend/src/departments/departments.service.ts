import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departments } from './interfaces/departments.schema';
import { CreateDepartmentPayload } from './interfaces/create-department.payload';
import { UpdateDepartmentPayload } from './interfaces/update-department.payload';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel('Departments')
    private readonly departmentsModel: Model<Departments>,
  ) {}

  async createDepartment(createDepartmentPayload: CreateDepartmentPayload) {}
  async findDepartmentById(id: string) {}
  async findAllDepartments() {}
  async updateDepartment(updateDepartmentPayload: UpdateDepartmentPayload) {}
  async deleteDepartment(id: string) {}
}
