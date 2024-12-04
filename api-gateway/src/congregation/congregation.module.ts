import { Module } from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CongregationController } from './congregation.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyrmqModule],
  controllers: [CongregationController],
  providers: [CongregationService],
})
export class CongregationModule {}
