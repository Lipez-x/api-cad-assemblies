import { Injectable, Logger } from '@nestjs/common';
import { History } from './schemas/history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeneratingHistoryPayload } from './interfaces/generating-history.payload';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History') private readonly historyModel: Model<History>,
  ) {}

  private logger = new Logger(HistoryService.name);

  async generatingHistory(generatingHistoryPayload: GeneratingHistoryPayload) {
    try {
      const { member, position } = generatingHistoryPayload;

      const history = new this.historyModel({
        member,
        currentPosition: position,
        positions: [position],
      });

      await history.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
