import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsSchema } from './interfaces/departments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Departments', schema: DepartmentsSchema },
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
