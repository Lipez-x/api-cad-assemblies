import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  private logger = new Logger(DepartmentService.name);

  createDepartment(createDepartmentDto: CreateDepartmentDto) {
    try {
      this.clientAdminBackend.emit('create-department', createDepartmentDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDepartments(id: string) {
    const department = await lastValueFrom(
      this.clientAdminBackend.send('get-departments', id ? id : ''),
    );

    if (!department) {
      throw new NotFoundException('Department not found');
    }
    try {
      return department;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await lastValueFrom(
      this.clientAdminBackend.send('get-departments', id),
    );

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    try {
      this.clientAdminBackend.emit('update-department', {
        id,
        updateDepartmentDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteDepartment(id: string) {
    const department = await lastValueFrom(
      this.clientAdminBackend.send('get-departments', id),
    );

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    try {
      this.clientAdminBackend.emit('delete-department', id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
