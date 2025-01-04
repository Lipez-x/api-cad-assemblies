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
import { CongregationService } from './congregation.service';
import { CreateCongregationDto } from './dtos/create-congregation.dto';
import { UpdateCongregationDto } from './dtos/update-congregation.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('api/v1/congregation')
export class CongregationController {
  constructor(private readonly congregationService: CongregationService) {}

  private logger = new Logger(CongregationController.name);

  /**
   * Criar congregação
   * @remarks Envia ao microservice a mensagem para adicionar a congregação
   * @throws {201} Mensagem para adicionar congregação enviada
   * @throws {500} Erro interno do servidor
   */
  @Post()
  @UsePipes(ValidationPipe)
  createCongregation(@Body() createCongregationPayload: CreateCongregationDto) {
    this.logger.log(
      `Congregation: ${JSON.stringify(createCongregationPayload)}`,
    );

    this.congregationService.createCongregation(createCongregationPayload);
  }

  /**
   * Buscar congregações
   * @remarks Retorna uma lista de todas as congregações ou uma congregação específica, caso o ID seja fornecido.
   * @param id
   * @throws {404} Congregação não encontrada
   * @throws {500} Erro interno do servidor
   */
  @ApiResponse({
    status: 200,
    example: [
      {
        _id: '6756e541dc556a11d82de861',
        name: 'Cedro',
        leader: 'Pb. Júnior',
        address: {
          street: 'Rua dois',
          number: 123,
          neighborhood: 'Cedro',
        },
        members: ['6756e5619692955ebfd47b3f'],
        createdAt: '2024-12-09T12:40:33.373Z',
        updatedAt: '2024-12-09T12:44:22.469Z',
        __v: 0,
      },
    ],
  })
  @Get()
  async getCongregations(@Query('id') id: string) {
    return await this.congregationService.getCongregations(id);
  }

  /**
   *
   * Atualizar congregação
   * @remarks Envia ao microservice a mensagem para atualizar uma congregação
   * @param id
   * @throws {200} Mensagem para atualizar congregação enviada com sucesso
   * @throws {404} Congregação não encontrada
   * @throws {500} Erro interno do servidor
   */
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCongregation(
    @Param('id') id: string,
    @Body() updateCongregationDto: UpdateCongregationDto,
  ) {
    this.logger.log(
      `Congregation: ${id}, update body: ${JSON.stringify(updateCongregationDto)}`,
    );
    await this.congregationService.updateCongregation(
      id,
      updateCongregationDto,
    );
  }

  /**
   *
   * Deletar congregação
   * @remarks Envia ao microservice a mensagem para deletar uma congregação
   * @param id
   * @throws {200} Mensagem para deletar congregação enviada com sucesso
   * @throws {404} Congregação não encontrada
   * @throws {500} Erro interno do servidor
   */
  @Delete('/:id')
  async deleteCongregation(@Param('id') id: string) {
    this.logger.log(`Delete Congregation: ${id}`);
    await this.congregationService.deleteCongregation(id);
  }
}
