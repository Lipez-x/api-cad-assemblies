import { Document } from 'mongoose';
import { Address } from 'cluster';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EcclesiasticalDataSchema } from './ecclesiastical-data.schema';
import { EcclesiasticalData } from '../interfaces/ecclesiastical-data.interface';

@Schema({ timestamps: true, collection: 'members' })
export class Members extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  rg: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  birthPlace: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: Object, required: true })
  address: Address;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  scholarity: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  civilStatus: string;

  @Prop()
  spouseName: string;

  @Prop()
  motherName: string;

  @Prop()
  fatherName: string;

  @Prop()
  weddingDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ type: EcclesiasticalDataSchema, required: true })
  ecclesiasticalData: EcclesiasticalData;
}

export const MembersSchema = SchemaFactory.createForClass(Members);
