import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'departments' })
export class Departments extends Document {
  @Prop()
  name: string;
  @Prop()
  leader: string;
  @Prop()
  members: Array<string>;
}

export const DepartmentsSchema = SchemaFactory.createForClass(Departments);
