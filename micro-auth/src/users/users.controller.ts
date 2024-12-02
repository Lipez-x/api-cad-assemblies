import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RegisterUserPayload } from './interfaces/register-user.payload';
import { UsersService } from './users.service';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('register-user')
  async register(
    @Ctx() context: RmqContext,
    @Payload() registerUserPayload: RegisterUserPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    this.logger.log(`User: ${JSON.stringify(registerUserPayload)}`);

    try {
      await this.usersService.register(registerUserPayload);

      await channel.ack(message);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }

  @MessagePattern('get-user')
  async getUserByEmail(@Ctx() context: RmqContext, @Payload() email: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.usersService.getUserByEmail(email);
    } finally {
      await channel.ack(message);
    }
  }
}
