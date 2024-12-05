import mongoose from 'mongoose';
import { Position } from './position.dto';

export interface EcclesiasticalData {
  position: Position;
  department: string;
  confessionDate: Date;
  baptismDate: Date;
  congregation: mongoose.Schema.Types.ObjectId;
  pastorName: string;
  receivingType: string;
  receivingDate: Date;
  baptizedHolySpirit: boolean;
  baptizedHolySpiritDate: Date;
}
