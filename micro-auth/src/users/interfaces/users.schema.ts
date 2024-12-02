import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class Users extends Document {
  @Prop({ isRequired: true })
  login: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ isRequired: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
