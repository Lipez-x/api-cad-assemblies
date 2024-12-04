import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Roles(UserRole.ADMIN)
@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  private logger = new Logger(DepartmentController.name);

  @Post()
  @UsePipes(ValidationPipe)
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    this.logger.log(`Department: ${JSON.stringify(createDepartmentDto)}`);
    this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  async getDepartments(@Query('id') id: string) {
    return await this.departmentService.getDepartments(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateDepartment(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    this.logger.log(
      `Department: ${id}, Body: ${JSON.stringify(updateDepartmentDto)}`,
    );
    await this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete('/:id')
  async deleteDepartment(@Param('id') id: string) {
    this.logger.log(`Delete department: ${id}`);
    await this.departmentService.deleteDepartment(id);
  }
}
