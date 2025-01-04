import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/auth-request';
import { IsPublic } from '../common/decorators/is-public.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login
   * @remarks Autenticar usuário e retornar um token JWT para acesso às funcionalidades protegidas da API.
   * @throws {200} Token JWT gerado com sucesso
   * @throws {400} O endereço de email ou a senha fornecidos estão incorretos
   * @throws {500} Erro interno do servidor
   */
  @IsPublic()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description: 'Dados para realizar login',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'cadassemblies@email.com',
        },
        password: {
          type: 'string',
          example: 'Cadassemblies123',
        },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }
}
