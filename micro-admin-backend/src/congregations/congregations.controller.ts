import { Controller, Logger } from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateCongregationPayload } from './interfaces/create-congregation.payload';
import { UpdateCongregationPayload } from './interfaces/update-congregation.payload';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller()
export class CongregationsController {
  constructor(private readonly congregationsService: CongregationsService) {}

  private logger = new Logger(CongregationsController.name);

  @EventPattern('create-congregation')
  async createCongregation(
    @Ctx() context: RmqContext,
    @Payload() createCongregationPayload: CreateCongregationPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.congregationsService.createCongregation(
        createCongregationPayload,
      );
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

  @MessagePattern('get-congregations')
  async getCongregations(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      if (id) {
        return await this.congregationsService.findCongregationById(id);
      } else {
        return await this.congregationsService.findAllCongregations();
      }
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('update-congregation')
  async updateCongregation(
    @Ctx() context: RmqContext,
    @Payload() updateCongregationPayload: UpdateCongregationPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.congregationsService.updateCongregation(
        updateCongregationPayload,
      );
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

  @EventPattern('delete-congregation')
  async deleteCongregation(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.congregationsService.deleteCongregation(id);
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
