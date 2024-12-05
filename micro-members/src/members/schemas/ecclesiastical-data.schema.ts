import mongoose from 'mongoose';
import { Position } from '../interfaces/interfaces/position.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class EcclesiasticalData {
  @Prop({ required: true })
  position: Position;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departments' })
  department: string;

  @Prop({ required: true })
  confessionDate: Date;

  @Prop({ required: true })
  baptismDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Congregations',
    required: true,
  })
  congregation: string;

  @Prop({ required: true })
  pastorName: string;

  @Prop({ required: true })
  receivingType: string;

  @Prop({ required: true })
  receivingDate: Date;

  @Prop()
  baptizedHolySpirit: boolean;

  @Prop()
  baptizedHolySpiritDate: Date;
}

export const EcclesiasticalDataSchema =
  SchemaFactory.createForClass(EcclesiasticalData);
