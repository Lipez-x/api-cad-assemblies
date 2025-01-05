import {
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
  /**
   * Posição do membro na igreja
   */
  @IsObject()
  position: Position;
  /**
   * ID do departamento que o membro faz parte
   * @example '6756eba3336d4c10ca51bd70'
   */
  @IsOptional()
  department?: string;
  /**
   * Data de profissão da fé
   * @example '2021-09-03'
   */
  @IsDateString()
  confessionDate: Date;
  /**
   * Data de batismo
   * @example '2022-04-01'
   */
  @IsDateString()
  baptismDate: Date;
  /**
   * ID da congregação que o membro faz parte
   * @example '6756e541dc556a11d82de861'
   */
  @IsNotEmpty()
  congregation: string;
  /**
   * Nome do pastor
   * @example 'Pr. Paulo Oliveira'
   */
  @IsString()
  pastorName: string;
  /**
   * Tipo de recebimento do membro na igreja
   * @example 'TRANSFERÊNCIA'
   */
  @IsEnum(ReceivingType)
  receivingType: ReceivingType;
  /**
   * Data de recebimento do membro na igreja
   * @example '2022-09-09'
   */
  @IsDateString()
  receivingDate: Date;
}
