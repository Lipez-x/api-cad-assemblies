import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersSchema } from './schemas/members.schema';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Members', schema: MembersSchema }]),
    ProxyrmqModule,
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
