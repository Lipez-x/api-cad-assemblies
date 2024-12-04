import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop()
  members: Array<string>;
}

export const CongregationsSchema = SchemaFactory.createForClass(Congregation);
