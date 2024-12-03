import { Module } from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import { CongregationsController } from './congregations.controller';

@Module({
  controllers: [CongregationsController],
  providers: [CongregationsService],
})
export class CongregationsModule {}
