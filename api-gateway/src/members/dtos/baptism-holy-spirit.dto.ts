import { IsDateString } from 'class-validator';

export class BaptismHolySpiritDto {
  @IsDateString()
  date: Date;
}
