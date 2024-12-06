import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'departments' })
export class Departments extends Document {
  @Prop()
  name: string;
  @Prop()
  leader: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members' }] })
  members: mongoose.Types.ObjectId[];
}

export const DepartmentsSchema = SchemaFactory.createForClass(Departments);
