import { Controller, Logger } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { History } from './schemas/history.schema';
import { GeneratingHistoryPayload } from './interfaces/generating-history.payload';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  private logger = new Logger(HistoryController.name);

  @EventPattern('generating-history')
  async generatingHistory(
    @Ctx() context: RmqContext,
    @Payload() generatingHistoryPayload: GeneratingHistoryPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.historyService.generatingHistory(generatingHistoryPayload);
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
