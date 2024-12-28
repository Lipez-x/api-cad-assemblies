import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './users.service';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { ConfirmPasswordDto } from './dtos/confirm-password.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
@Controller('api/v1/users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  /**
   * Criar novo usuário
   * @remarks Rota para criar um novo usuário, sendo ele Administrador ou Colaborador.
   * @throws {201} Mensagem para criar usuário enviada
   * @throws {400} A senha não foi confirmada corretamente
   * @throws {500} Erro interno do servidor
   */
  @IsPublic()
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log(`User: ${JSON.stringify(registerUserDto)}`);
    return this.usersService.register(registerUserDto);
  }

  /**
   * Esqueceu senha
   * @remarks Operação para enviar um código de recuperação da conta para o email do usuário.
   * O código será utilizado na operação de confirmar senha para modificar a senha do usuário
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
   * @remarks Operação para modificar senha do usuário com o código de recuperação.
   * @throws {201} Mensagem para modificar senha enviada
   * @throws {404} Usuário não encontrado
   * @throws {401} Código inválido
   */
  @IsPublic()
  @Post('confirm-password')
  @UsePipes(ValidationPipe)
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    await this.usersService.confirmPassword(confirmPasswordDto);
  }
}
