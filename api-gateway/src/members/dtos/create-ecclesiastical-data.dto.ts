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
import { Department } from 'src/common/interfaces/department.interface';
import { Congregation } from 'src/common/interfaces/congregation.interface';
import { ReceivingType } from '../enums/receiving-type';

export class CreateEcclesiasticalDataDto {
  @IsObject()
  position: Position;

  @IsNotEmpty()
  department: Department;

  @IsDateString()
  confessionDate: Date;

  @IsDateString()
  baptismDate: Date;

  @IsNotEmpty()
  congregation: Congregation;

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
