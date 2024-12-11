import { Controller, Logger } from '@nestjs/common';
import { HistoryService } from './history.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Position } from 'src/members/interfaces/position.dto';
import { GeneratingHistoryPayload } from './interfaces/generating-history.payload';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  private logger = new Logger(HistoryController.name);

  @MessagePattern('get-history')
  async getHistory(@Ctx() context: RmqContext, @Payload() member: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      return await this.historyService.getHistory(member);
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('add-position')
  async addPosition(
    @Ctx() context: RmqContext,
    @Payload() addPositionPayload: GeneratingHistoryPayload,
  ) {
    console.log(addPositionPayload);

    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.historyService.addPosition(addPositionPayload);
      await channel.ack(message);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }
}
