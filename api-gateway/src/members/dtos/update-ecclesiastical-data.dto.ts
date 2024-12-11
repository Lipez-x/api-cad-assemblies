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
import { Department } from 'src/common/interfaces/department.interface';
import { Congregation } from 'src/common/interfaces/congregation.interface';
import { Type } from 'class-transformer';

export class UpdateEcclesiasticalDataDto {
  @IsObject()
  @IsOptional()
  position: Position;

  @IsNotEmpty()
  @IsOptional()
  department: Department;

  @IsDateString()
  @IsOptional()
  baptismDate: Date;

  @IsNotEmpty()
  @IsOptional()
  congregation: Congregation;

  @IsString()
  @IsOptional()
  pastorName: string;
}
