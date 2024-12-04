import { Module } from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CongregationController } from './congregation.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [ProxyrmqModule],
  controllers: [CongregationController],
  providers: [CongregationService],
})
export class CongregationModule {}
