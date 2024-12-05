import { Controller, Logger } from '@nestjs/common';
import { MembersService } from './members.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateMemberPayload } from './interfaces/create-member-payload.interface';
import { UpdateMemberPayload } from './interfaces/update-member.payload';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  private logger = new Logger(MembersController.name);

  @EventPattern('create-member')
  async createMember(
    @Ctx() context: RmqContext,
    @Payload() createMemberPayload: CreateMemberPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.membersService.createMember(createMemberPayload);
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

  @MessagePattern('get-members')
  async getMembers(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      if (id) {
        return await this.membersService.findMemberById(id);
      } else {
        return await this.membersService.findAllMembers();
      }
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('update-member')
  async updateMember(
    @Ctx() context: RmqContext,
    @Payload() updateMemberPayload: UpdateMemberPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.membersService.updateMember(updateMemberPayload);
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

  @EventPattern('delete-member')
  async deleteMember(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.membersService.deleteMember(id);
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
}
