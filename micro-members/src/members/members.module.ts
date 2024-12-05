import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersSchema } from './schemas/members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Members', schema: MembersSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
