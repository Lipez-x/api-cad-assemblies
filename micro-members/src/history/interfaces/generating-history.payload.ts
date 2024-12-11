import { Position } from 'src/members/interfaces/position.dto';

export interface GeneratingHistoryPayload {
  member: string;
  position: Position;
}
