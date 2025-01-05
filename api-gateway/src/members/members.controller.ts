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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { BaptismHolySpiritDto } from './dtos/baptism-holy-spirit.dto';
import { Position } from 'src/common/interfaces/position.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { FilesUploadDto } from './dtos/files.dto';

@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.COLLABORATOR)
@Controller('api/v1/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  private logger = new Logger(MembersController.name);

  /**
   *
   * Buscar histórico
   * @remarks Retorna uma lista com todas as posições que o membro ocupou.
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @ApiResponse({
    status: 200,
    example: {
      member: {
        _id: '6759b07f037b5bece6d11a7f',
        name: 'João da Silva',
      },
      currentPosition: {
        position: 'Pastor',
        startDate: '2025-01-02T00:00:00.000Z',
      },
      positions: [
        {
          position: 'Pastor',
          startDate: '2025-01-02T00:00:00.000Z',
        },
        {
          position: 'Presbítero',
          startDate: '2020-01-01T00:00:00.000Z',
          endDate: '2023-01-01T00:00:00.000Z',
        },
        {
          position: 'Congregado',
          startDate: '2017-01-01T00:00:00.000Z',
          endDate: '2019-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2024-12-11T15:32:15.830Z',
      updatedAt: '2024-12-11T15:33:29.447Z',
      __v: 0,
    },
  })
  @Get('/history/:id')
  async getHistory(@Param('id') member: string) {
    return await this.membersService.getHistory(member);
  }

  /**
   *
   * Adicionar posição
   * @remarks Envia ao microservice a mensagem para registrar no hisórico uma posição que o membro já ocupou.
   * @throws {200} Mensagem para registrar posição enviada com sucesso
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @Put('/history/:id')
  async addPosition(@Param('id') member: string, @Body() position: Position) {
    return await this.membersService.addPosition(member, position);
  }

  /**
   *
   * Upload de imagem
   * @remarks Adiciona a imagem do usuário em um bucket no Amazon S3 e salva URL da imagem nos dados do membro.
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDto,
  })
  @ApiResponse({
    status: 201,
    example: {
      urlImage: 'https://user-images.s3/6759b07f037b5bece6d11a7f.jpeg',
    },
  })
  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any, @Param('id') id: string) {
    return await this.membersService.uploadImage(file, id);
  }

  /**
   *
   * Batismo no espírito santo
   * @remarks Modifica o status de batizado no espírito santo do membro para verdadeiro e adiciona a data do batismo.
   * @throws {200} Mensagem para modificar o satus de batizado no espírito santo enviada com sucesso
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @Put('/baptism-holy-spirit/:id')
  @UsePipes(ValidationPipe)
  async baptismHolySpirit(
    @Param('id') id: string,
    @Body() baptismHolyEspiritDto: BaptismHolySpiritDto,
  ) {
    this.logger.log(`Date: ${baptismHolyEspiritDto.date}`);
    await this.membersService.baptismHolySpirit(id, baptismHolyEspiritDto.date);
  }

  /**
   *
   * Adicionar membro
   * @remarks Envia ao microservice a mensagem para adiconar o membro.
   * @throws {201} Mensagem para adicionar membro enviada com sucesso
   * @throws {404} Congregação ou Departamento (caso fornecido) não encontrados
   * @throws {500} Erro interno do servidor
   */
  @Post()
  @UsePipes(ValidationPipe)
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    this.logger.log(`Member: ${JSON.stringify(createMemberDto)}`);
    await this.membersService.createMember(createMemberDto);
  }

  /**
   *
   * Buscar membros
   * @remarks Retorna uma lista de todos os membros ou um membro específico, caso o ID seja fornecido.
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @ApiResponse({
    status: 200,
    example: [
      {
        _id: '6759b07f037b5bece6d11a7f',
        name: 'Carlos Calebe Cordeiro',
        rg: '0000000000-0',
        cpf: '000.000.000-00',
        nationality: 'Brasileiro',
        birthDate: '1990-05-15T00:00:00.000Z',
        birthPlace: 'São Paulo',
        gender: 'Masculino',
        address: {
          street: 'Rua dois',
          number: 123,
          neighborhood: 'Centro',
        },
        phoneNumber: '88997776655',
        scholarity: 'Ensino Superior Completo',
        profession: 'Advogado',
        civilStatus: 'CASADO',
        spouseName: 'Maria Marina Monteiro',
        motherName: 'Luísa Calebe Silva',
        fatherName: 'Luiz Leandro Cordeiro',
        weddingDate: '2015-09-22T00:00:00.000Z',
        status: 'ATIVO',
        ecclesiasticalData: {
          position: {
            position: 'Presbítero',
            startDate: '2024-02-07T00:00:00.000Z',
          },
          department: '6756eba3336d4c10ca51bd70',
          confessionDate: '2021-09-03T00:00:00.000Z',
          baptismDate: '2022-04-01"T00:00:00.000Z',
          congregation: '6756e541dc556a11d82de861',
          pastorName: 'Pr. Paulo Oliveira',
          receivingType: 'TRANSFERÊNCIA',
          receivingDate: '2022-09-09T00:00:00.000Z',
          baptizedHolySpirit: true,
          baptizedHolySpiritDate: '2023-12-09T00:00:00.000Z',
        },
        createdAt: '2024-12-11T15:32:15.760Z',
        updatedAt: '2024-12-12T14:06:41.832Z',
        __v: 0,
        urlImage:
          'https://user-images-cadassemblies.s3.us-east-2.amazonaws.com/6759b07f037b5bece6d11a7f.jpeg',
      },
    ],
  })
  @Get()
  async getMembers(@Query('id') id: string) {
    return await this.membersService.getMembers(id);
  }

  /**
   *
   * Atualizar membro
   * @remarks Envia ao microservice a mensagem para atualizar um membro.
   * @throws {200} Mensagem para atualizar membro enviada com sucesso
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    this.logger.log(`Member '${id}': ${JSON.stringify(updateMemberDto)}`);
    await this.membersService.updateMember(id, updateMemberDto);
  }

  /**
   *
   * Deletar membro
   * @remarks Envia ao microservice a mensagem para deletar um membro.
   * @throws {200} Mensagem para deletar membro enviada com sucesso
   * @throws {404} Membro não encontrado
   * @throws {500} Erro interno do servidor
   */
  @Delete('/:id')
  async deleteMember(@Param('id') id: string) {
    this.logger.log(`Delete member: ${JSON.stringify(id)}`);
    await this.membersService.deleteMember(id);
  }
}
