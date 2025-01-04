import { IsObject, IsOptional, IsString } from 'class-validator';

export class Address {
  /**
   * @example 'Rua dois'
   */
  street: string;
  /**
   * @example '123'
   */
  number: string;
  /**
   * @example 'Cedro'
   */
  neighborhood: string;
}

export class UpdateCongregationDto {
  /**
   * Nome da congregação
   * @example 'Cedro'
   */
  @IsString()
  @IsOptional()
  name?: string;
  /**
   * Nome do dirigente da congregação
   * @example 'Pb. Paulo'
   */
  @IsString()
  @IsOptional()
  leader?: string;
  /**
   * Endereço da congregação
   */
  @IsObject()
  @IsOptional()
  address?: Address;
}
