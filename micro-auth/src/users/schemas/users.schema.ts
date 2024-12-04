import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

@Schema({ timestamps: true, collection: 'users' })
export class Users extends Document {
  @Prop({ unique: true })
  email: string;
  @Prop({ isRequired: true })
  role: UserRole;
  @Prop({ isRequired: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
