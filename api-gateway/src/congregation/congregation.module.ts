import { Module } from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CongregationController } from './congregation.controller';

@Module({
  controllers: [CongregationController],
  providers: [CongregationService],
})
export class CongregationModule {}
