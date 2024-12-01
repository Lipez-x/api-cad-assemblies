import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyrmqModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
