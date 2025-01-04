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
import { ApiResponse } from '@nestjs/swagger';

@Roles(UserRole.ADMIN)
@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  private logger = new Logger(DepartmentController.name);

  /**
   * Criar departamento
   * @remarks Envia ao microservice a mensagem para adicionar o departamento
   * @throws {201} Mensagem para adicionar departamento enviada com sucesso
   * @throws {500} Erro interno do servidor
   */
  @Post()
  @UsePipes(ValidationPipe)
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    this.logger.log(`Department: ${JSON.stringify(createDepartmentDto)}`);
    this.departmentService.createDepartment(createDepartmentDto);
  }

  /**
   * Buscar departamentos
   * @remarks Retorna uma lista de todos os departamentos ou um departamento específico, caso o ID seja fornecido.
   * @param id
   * @throws {404} Departamento não encontrado
   * @throws {500} Erro interno do servidor
   */
  @ApiResponse({
    status: 200,
    example: [
      {
        _id: '6756eba3336d4c10ca51bd70',
        name: 'Juventude',
        leader: 'Dc. Jorge',
        members: [
          '6756ebb339992c5b5a164796',
          '6756f1c3ef2b0ce50a0141a5',
          '6759b07f037b5bece6d11a7f',
        ],
        createdAt: '2024-12-09T13:07:47.606Z',
        updatedAt: '2024-12-12T14:06:42.065Z',
        __v: 0,
      },
    ],
  })
  @Get()
  async getDepartments(@Query('id') id: string) {
    return await this.departmentService.getDepartments(id);
  }

  /**
   *
   * Atualizar departamento
   * @remarks Envia ao microservice a mensagem para atualizar um departamento
   * @param id
   * @throws {200} Mensagem para atualizar departamento enviada com sucesso
   * @throws {404} Departamento não encontrado
   * @throws {500} Erro interno do servidor
   */
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

  /**
   *
   * Deletar departamento
   * @remarks Envia ao microservice a mensagem para deletar um departamento
   * @param id
   * @throws {200} Mensagem para deletar departamento enviada com sucesso
   * @throws {404} Departamento não encontrado
   * @throws {500} Erro interno do servidor
   */
  @Delete('/:id')
  async deleteDepartment(@Param('id') id: string) {
    this.logger.log(`Delete department: ${id}`);
    await this.departmentService.deleteDepartment(id);
  }
}
