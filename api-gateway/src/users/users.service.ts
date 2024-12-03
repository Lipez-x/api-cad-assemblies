import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private logger = new Logger(UsersService.name);

  private clientAuth =
    this.clientProxyCadAssemblies.getClientProxyAuthInstance();

  async register(registerUserDto: RegisterUserDto) {
    const { password, confirmPassword } = registerUserDto;
    if (password != confirmPassword) {
      throw new BadRequestException('Password was not confirmed correctly');
    }

    try {
      this.clientAuth.emit('register-user', registerUserDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
