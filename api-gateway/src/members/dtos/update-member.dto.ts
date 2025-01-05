import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CivilStatus } from '../enums/civil-status.enum';
import { UpdateEcclesiasticalDataDto } from './update-ecclesiastical-data.dto';
import { Type } from 'class-transformer';
import { MemberStatus } from '../enums/member-status.dto';
import { Address } from 'src/congregation/dtos/update-congregation.dto';

export class UpdateMemberDto {
  /**
   * Nome do membro
   * @example 'Carlos Calebe Cordeiro'
   */
  @IsString()
  @IsOptional()
  name?: string;
  /**
   * Endereço do membro
   */
  @IsNotEmpty()
  @IsOptional()
  address?: Address;
  /**
   * Número de telefone do membro
   * @example '88997776655'
   */
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  /**
   * Escolaridade do membro
   * @example 'Ensino Superior Completo'
   */
  @IsString()
  @IsOptional()
  scholarity?: string;
  /**
   * Profissão do membro
   * @example 'Advogado'
   */
  @IsString()
  @IsOptional()
  profession?: string;
  /**
   * Estado civil do membro
   * @example 'CASADO'
   */
  @IsEnum(CivilStatus)
  @IsOptional()
  civilStatus?: CivilStatus;
  /**
   * Nome do cônjuge do membro
   * @example 'Maria Marina Monteiro'
   */
  @IsString()
  @IsOptional()
  spouseName?: string;
  /**
   * Nome da mãe do membro
   * @example 'Luísa Calebe Silva'
   */
  @IsString()
  @IsOptional()
  motherName?: string;
  /**
   * Nome do pai do membro
   * @example 'Luiz Leandro Cordeiro'
   */
  @IsString()
  @IsOptional()
  fatherName?: string;
  /**
   * Data de casamento do membro
   * @example '2015-09-22'
   */
  @IsDateString()
  @IsOptional()
  weddingDate?: Date;
  /**
   * Status do membro
   * @example 'ATIVO'
   */
  @IsEnum(MemberStatus)
  status?: MemberStatus;
  /**
   * Url da imagem do membro
   * @example 'https://user-images.jpeg'
   */
  @IsString()
  @IsOptional()
  urlImage?: string;
  /**
   * Dados Eclesiásticos do membro
   */
  @ValidateNested()
  @Type(() => UpdateEcclesiasticalDataDto)
  @IsOptional()
  ecclesiasticalData?: UpdateEcclesiasticalDataDto;
}
