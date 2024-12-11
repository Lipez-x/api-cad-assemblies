import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Position } from '../../common/interfaces/position.dto';
import { ReceivingType } from '../enums/receiving-type';
import { Type } from 'class-transformer';

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
}
