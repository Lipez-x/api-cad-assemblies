import { IsObject, IsOptional, IsString } from 'class-validator';

export class Address {
  street: string;
  number: string;
  neighborhood: string;
}

export class UpdateCongregationDto {
  /**
   * Nome da congregação
   * @example 'Cedro'
   */
  @IsString()
  @IsOptional()
  name: string;
  /**
   * Nome do dirigente da congregação
   * @example 'Pb. Paulo'
   */
  @IsString()
  @IsOptional()
  leader: string;
  /**
   * Endereço da congregação
   * @example { street: 'Rua um', number: '321', neighborhood: 'Cedro' }
   */
  @IsObject()
  @IsOptional()
  address: Address;
}
