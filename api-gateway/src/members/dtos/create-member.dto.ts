import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CivilStatus } from '../enums/civil-status.enum';
import { MemberStatus } from '../enums/member-status.dto';
import { CreateEcclesiasticalDataDto } from './create-ecclesiastical-data.dto';
import { Type } from 'class-transformer';
import { Address } from 'src/congregation/dtos/update-congregation.dto';

export class CreateMemberDto {
  /**
   * Nome do membro
   * @example 'Carlos Calebe Cordeiro'
   */
  @IsString()
  name: string;
  /**
   * RG do membro
   * @example '0000000000-0'
   */
  @IsString()
  rg: string;
  /**
   * CPF do membro
   * @example '000.000.000-00'
   */
  @IsString()
  cpf: string;
  /**
   * Nacionalidade do membro
   * @example 'Brasileiro'
   */
  @IsString()
  nationality: string;
  /**
   * Data de nascimento do membro
   * @example '1990-05-15'
   */
  @IsDateString()
  birthDate: Date;
  /**
   * Local de nascimento do membro
   * @example 'São Paulo'
   */
  @IsString()
  birthPlace: string;
  /**
   * Gênero do membro
   * @example 'Masculino'
   */
  @IsString()
  gender: string;
  /**
   * Endereço do membro
   */
  @IsNotEmpty()
  address: Address;
  /**
   * Número de telefone do membro
   * @example '88997776655'
   */
  @IsString()
  phoneNumber: string;
  /**
   * Escolaridade do membro
   * @example 'Ensino Superior Completo'
   */
  @IsString()
  scholarity: string;
  /**
   * Profissão do membro
   * @example 'Advogado'
   */
  @IsString()
  profession: string;
  /**
   * Estado civil do membro
   * @example 'CASADO'
   */
  @IsEnum(CivilStatus)
  civilStatus: CivilStatus;
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
  status: MemberStatus;
  /**
   * Dados Eclesiásticos do membro
   */
  @ValidateNested()
  @Type(() => CreateEcclesiasticalDataDto)
  ecclesiasticalData: CreateEcclesiasticalDataDto;
}
