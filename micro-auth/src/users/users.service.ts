import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserPayload } from './interfaces/register-user.payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './interfaces/users.schema';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { verify } from 'crypto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async register(registerUserPayload: RegisterUserPayload) {
    const { login, email, password } = registerUserPayload;

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const createUser = new this.usersModel({
        login,
        email,
        password: hashedPassword,
      });

      await createUser.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
