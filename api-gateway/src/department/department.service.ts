import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Injectable()
export class DepartmentService {
  createDepartment(createDepartmentDto: CreateDepartmentDto) {}
  async getDepartments(id: string) {}
  async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {}
  async deleteDepartment(id: string) {}
}
