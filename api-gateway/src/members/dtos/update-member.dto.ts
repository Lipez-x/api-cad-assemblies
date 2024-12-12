import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CivilStatus } from '../enums/civil-status.enum';
import { MemberStatus } from '../enums/member-status.dto';
import { Address } from 'cluster';
import { UpdateEcclesiasticalDataDto } from './update-ecclesiastical-data.dto';
import { Type } from 'class-transformer';

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  address?: Address;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  scholarity?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsEnum(CivilStatus)
  @IsOptional()
  civilStatus?: string;

  @IsString()
  @IsOptional()
  spouseName?: string;

  @IsString()
  @IsOptional()
  motherName?: string;

  @IsString()
  @IsOptional()
  fatherName?: string;

  @IsDateString()
  @IsOptional()
  weddingDate?: Date;

  @IsString()
  @IsOptional()
  urlImage?: string;

  @ValidateNested()
  @Type(() => UpdateEcclesiasticalDataDto)
  @IsOptional()
  ecclesiasticalData?: UpdateEcclesiasticalDataDto;
}
