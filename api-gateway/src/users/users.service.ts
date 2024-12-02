import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  clientAuth = this.clientProxyCadAssemblies.getClientProxyAuthInstance();

  async register(registerUserDto: RegisterUserDto) {
    const { password, confirmPassword } = registerUserDto;
    if (password != confirmPassword) {
      throw new BadRequestException('Password was not confirmed correctly');
    }

    this.clientAuth.emit('register-user', registerUserDto);
  }
}
