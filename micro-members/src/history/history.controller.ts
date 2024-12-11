import { Controller, Logger } from '@nestjs/common';
import { HistoryService } from './history.service';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  private logger = new Logger(HistoryController.name);
}
