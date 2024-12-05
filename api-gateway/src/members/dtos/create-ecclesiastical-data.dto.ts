import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Position } from '../../common/interfaces/position.dto';

import { ReceivingType } from '../enums/receiving-type';

export class CreateEcclesiasticalDataDto {
  @IsObject()
  position: Position;

  @IsOptional()
  department: string;

  @IsDateString()
  confessionDate: Date;

  @IsDateString()
  baptismDate: Date;

  @IsNotEmpty()
  congregation: string;

  @IsString()
  pastorName: string;

  @IsEnum(ReceivingType)
  receivingType: string;

  @IsDateString()
  receivingDate: Date;

  @IsBoolean()
  baptizedHolySpirit: boolean;

  @IsDateString()
  @IsOptional()
  baptizedHolySpiritDate: Date;
}
