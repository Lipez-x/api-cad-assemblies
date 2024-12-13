import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ConfirmPasswordDto } from './dtos/confirm-password.dto';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/auth/interfaces/user.interface';

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

  async forgotPassword(email: string) {
    const user: User = await lastValueFrom(
      this.clientAuth.send('get-user', email),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      this.clientAuth.emit('forgot-password', email);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async confirmPassword(confirmPasswordDto: ConfirmPasswordDto) {
    const user: User = await lastValueFrom(
      this.clientAuth.send('get-user', confirmPasswordDto.email),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.recoveryCode != confirmPasswordDto.recoveryCode) {
      throw new UnauthorizedException('Invalid code');
    }
    try {
      this.clientAuth.emit('confirm-password', confirmPasswordDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
