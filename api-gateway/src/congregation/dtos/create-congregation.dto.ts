import { IsObject, IsString } from 'class-validator';
import { Address } from './update-congregation.dto';

export class CreateCongregationDto {
  /**
   * Nome da congregação
   * @example 'Cedro'
   */
  @IsString()
  name: string;
  /**
   * Nome do dirigente da congregação
   * @example 'Pb. Júnior'
   */
  @IsString()
  leader: string;
  /**
   * Endereço da congregação
   * @example { street: 'Rua dois', number: '123', neighborhood: 'Cedro' }
   */
  @IsObject()
  address: Address;
}
