import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'departments' })
export class Departments extends Document {
  @Prop()
  name: string;
  @Prop()
  leader: string;
  @Prop()
  members: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Members';
    },
  ];
}

export const DepartmentsSchema = SchemaFactory.createForClass(Departments);
