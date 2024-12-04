import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departments } from './interfaces/departments.schema';
import { CreateDepartmentPayload } from './interfaces/create-department.payload';
import { UpdateDepartmentPayload } from './interfaces/update-department.payload';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel('Departments')
    private readonly departmentsModel: Model<Departments>,
  ) {}

  private logger = new Logger(Departments.name);

  async createDepartment(createDepartmentPayload: CreateDepartmentPayload) {
    try {
      const createdDepartment = new this.departmentsModel(
        createDepartmentPayload,
      );

      await createdDepartment.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findDepartmentById(id: string) {
    try {
      const department = await this.departmentsModel.findById(id).exec();
      return department;
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findAllDepartments() {
    try {
      return await this.departmentsModel.find().exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async updateDepartment(updateDepartmentPayload: UpdateDepartmentPayload) {
    try {
      const { id, updateDepartmentDto } = updateDepartmentPayload;

      await this.departmentsModel.findByIdAndUpdate(id, {
        $set: updateDepartmentDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
  async deleteDepartment(id: string) {
    try {
      await this.departmentsModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
