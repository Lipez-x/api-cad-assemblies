import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserPayload } from './interfaces/user.payload';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
    private readonly jwtService: JwtService,
  ) {}

  clientAuth = this.clientProxyCadAssemblies.getClientProxyAuthInstance();

  async login(user: User) {
    const payload: UserPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user: User = await lastValueFrom(
      this.clientAuth.send('get-user', email),
    );

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }

      throw new BadRequestException(
        'Email address or password provided is incorrect',
      );
    }
  }
}
