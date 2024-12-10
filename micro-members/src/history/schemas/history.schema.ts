import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Position } from 'src/members/interfaces/position.dto';

@Schema({ timestamps: true, collection: 'History' })
export class History extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Members' })
  member: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: Position }] })
  positions: Position[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
