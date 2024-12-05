import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyrmqModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
