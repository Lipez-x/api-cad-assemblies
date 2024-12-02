import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  clientAuth = this.clientProxyCadAssemblies.getClientProxyAuthInstance();

  async validateUser(email: string, password: string) {
    const user = await this.clientAuth.send('get-user', email).toPromise();

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return user;
      }
    }

    throw new BadRequestException(
      'Email address or password provided is incorrect',
    );
  }
}
