import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CivilStatus } from '../enums/civil-status.enum';
import { MemberStatus } from '../enums/member-status.dto';
import { Address } from 'cluster';
import { UpdateEcclesiasticalDataDto } from './update-ecclesiastical-data.dto';

export class CreateMemberDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
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

  @IsObject()
  @IsOptional()
  ecclesiasticalData: UpdateEcclesiasticalDataDto;
}
