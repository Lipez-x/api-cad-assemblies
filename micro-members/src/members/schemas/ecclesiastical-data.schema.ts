import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from '../interfaces/position.dto';

@Schema({ _id: false })
export class EcclesiasticalData {
  @Prop()
  position: Position;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departments' })
  department: string;

  @Prop()
  confessionDate: Date;

  @Prop()
  baptismDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Congregations',
    required: true,
  })
  congregation: string;

  @Prop()
  pastorName: string;

  @Prop()
  receivingType: string;

  @Prop()
  receivingDate: Date;

  @Prop()
  baptizedHolySpirit?: boolean;

  @Prop()
  baptizedHolySpiritDate?: Date;
}

export const EcclesiasticalDataSchema =
  SchemaFactory.createForClass(EcclesiasticalData);
