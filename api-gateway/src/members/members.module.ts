import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [ProxyrmqModule, AwsModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
