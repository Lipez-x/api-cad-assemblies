import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyrmqModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
