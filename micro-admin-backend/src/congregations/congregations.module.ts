import { Module } from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import { CongregationsController } from './congregations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CongregationsSchema } from './schemas/congregations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Congregations', schema: CongregationsSchema },
    ]),
  ],
  controllers: [CongregationsController],
  providers: [CongregationsService],
})
export class CongregationsModule {}
