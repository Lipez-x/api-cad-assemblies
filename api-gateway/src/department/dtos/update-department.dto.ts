import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  /**
   * Nome do departamento
   * @example 'Juventude'
   */
  @IsString()
  @IsOptional()
  name?: string;
  /**
   * Líder do departamento
   * @example 'Dc. Jorge'
   */
  @IsString()
  @IsOptional()
  leader?: string;
}
