import { Controller, Logger } from '@nestjs/common';
import { HistoryService } from './history.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

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
}
