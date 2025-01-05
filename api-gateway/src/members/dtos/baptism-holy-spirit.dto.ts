import { IsDateString } from 'class-validator';

export class BaptismHolySpiritDto {
  /**
   * Data de batismo no espírito santo
   * @example '2023-12-22'
   */
  @IsDateString()
  date: Date;
}
