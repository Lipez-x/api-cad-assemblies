import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserPayload } from './interfaces/register-user.payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import { ConfirmPasswordPayload } from './interfaces/confirm-password.payload';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    private readonly mailService: MailerService,
  ) {}

  async register(registerUserPayload: RegisterUserPayload) {
    const { email, role, password } = registerUserPayload;

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const createUser = new this.usersModel({
        email,
        role,
        password: hashedPassword,
      });

      await createUser.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async sendCodeToForgotPassword(email: string) {
    try {
      const user = await this.usersModel.findOne({ email });
      user.recoveryCode = randomInt(100000, 1000000).toString();
      await user.save();
      this.mailService.sendMail({
        to: email,
        from: 'CAD ASSEMBLIES <ifelipelima.dev@gmail.com>',
        subject: 'Code to recovery account',
        text: `Code to recovery Account: ${user.recoveryCode}`,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async confirmPassword(confirmPasswordPayload: ConfirmPasswordPayload) {
    const { email, newPassword } = confirmPasswordPayload;
    try {
      const user = await this.usersModel.findOne({ email });

      user.recoveryCode = null;
      const salt = await bcrypt.genSalt(16);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await user.$set({ password: hashedPassword }).save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
