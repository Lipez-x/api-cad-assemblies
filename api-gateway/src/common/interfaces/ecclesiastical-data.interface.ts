import { Position } from './position.dto';

export interface EcclesiasticalData {
  position: Position;
  department: string;
  confessionDate: Date;
  baptismDate: Date;
  congregation: string;
  pastorName: string;
  receivingType: string;
  receivingDate: Date;
  baptizedHolySpirit: boolean;
  baptizedHolySpiritDate: Date;
}
