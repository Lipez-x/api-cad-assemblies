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
import { CreateEcclesiasticalDataDto } from './create-ecclesiastical-data.dto';
import { Address } from 'cluster';
import { Type } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsString()
  rg: string;

  @IsString()
  cpf: string;

  @IsString()
  nationality: string;

  @IsDateString()
  birthDate: Date;

  @IsDateString()
  birthPlace: Date;

  @IsString()
  gender: string;

  @IsNotEmpty()
  address: Address;

  @IsString()
  phoneNumber: string;

  @IsString()
  scholarity: string;

  @IsString()
  profession: string;

  @IsEnum(CivilStatus)
  civilStatus: string;

  @IsString()
  @IsOptional()
  spouseName: string;

  @IsString()
  @IsOptional()
  motherName: string;

  @IsString()
  @IsOptional()
  fatherName: string;

  @IsDateString()
  @IsOptional()
  weddingDate: Date;

  @IsEnum(MemberStatus)
  status: string;

  @ValidateNested()
  @Type(() => CreateEcclesiasticalDataDto)
  ecclesiasticalData: CreateEcclesiasticalDataDto;
}
