import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Position } from '../../common/interfaces/position.dto';

export class UpdateEcclesiasticalDataDto {
  /**
   * Posição do membro na igreja
   */
  @IsObject()
  @IsOptional()
  position?: Position;
  /**
   * ID do departamento que o membro faz parte
   * @example '6756eba3336d4c10ca51bd70'
   */
  @IsNotEmpty()
  @IsOptional()
  department?: string;
  /**
   * Data de batismo
   * @example '2022-04-01'
   */
  @IsDateString()
  @IsOptional()
  baptismDate?: Date;
  /**
   * ID da congregação que o membro faz parte
   * @example '6756e541dc556a11d82de861'
   */
  @IsNotEmpty()
  @IsOptional()
  congregation?: string;
  /**
   * Nome do pastor
   * @example 'Pr. Paulo Oliveira'
   */
  @IsString()
  @IsOptional()
  pastorName?: string;
}
