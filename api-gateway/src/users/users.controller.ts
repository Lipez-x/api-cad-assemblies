import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './users.service';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { ConfirmPasswordDto } from './dtos/confirm-password.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';
@Controller('api/v1/users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  /**
   * Pegar dados do usuário logado
   * @remarks Pegar os dados do usuário com base no token JWT fornecido.
   * @throws {500} Erro interno do servidor
   */
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário retornados com sucesso',
    example: {
      _id: '674f010b53e44dd1e502d7c5',
      email: 'cadassemblies@email.com',
      role: 'ADMIN',
    },
  })
  @Get('me')
  async getUserByJwt(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  /**
   * Criar novo usuário
   * @remarks Envia ao microservice a mensagem para criar o usuário, sendo ele Administrador ou Colaborador.
   * @throws {201} Mensagem para criar usuário enviada com sucesso
   * @throws {400} A senha não foi confirmada corretamente
   * @throws {500} Erro interno do servidor
   */
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log(`User: ${JSON.stringify(registerUserDto)}`);
    return this.usersService.register(registerUserDto);
  }

  /**
   * Esqueceu senha
   * @remarks Operação para enviar um código de recuperação da conta para o email do usuário.
   * O código será utilizado na operação de confirmar senha para modificar a senha do usuário.
   * @throws {201} Código enviado para o email fornecido
   * @throws {404} Usuário não encontrado
   * @throws {500} Erro interno do servidor
   */
  @IsPublic()
  @Post('forgot-password')
  @ApiBody({
    description: 'Endereço de e-mail do usuário para recuperação de senha',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'cadassemblies@email.com',
          description:
            'O e-mail do usuário que solicitou a recuperação de senha',
        },
      },
      required: ['email'],
    },
  })
  async forgotPassword(@Body() { email }: { email: string }) {
    await this.usersService.forgotPassword(email);
  }

  /**
   * Confirmar senha
   * @remarks Envia ao microservice a mensagem para modificar a senha do usuário com o código de recuperação.
   * @throws {201} Mensagem para modificar senha enviada com sucesso
   * @throws {404} Usuário não encontrado
   * @throws {401} Código inválido
   * @throws {500} Erro interno do servidor
   */
  @IsPublic()
  @Post('confirm-password')
  @UsePipes(ValidationPipe)
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    await this.usersService.confirmPassword(confirmPasswordDto);
  }
}
