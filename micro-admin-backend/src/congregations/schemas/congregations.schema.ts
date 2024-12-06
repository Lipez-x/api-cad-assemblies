import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export class Address {
  street: string;
  number: string | number;
  neighborhood: string;
}

@Schema({ timestamps: true, collection: 'congregations' })
export class Congregation extends Document {
  @Prop()
  name: string;
  @Prop()
  leader: string;
  @Prop()
  address: Address;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members' }] })
  members: mongoose.Types.ObjectId[];
}

export const CongregationsSchema = SchemaFactory.createForClass(Congregation);
