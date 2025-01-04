import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  /**
   * Nome do departamento
   * @example 'Juventude'
   */
  @IsString()
  name: string;
  /**
   * Líder do departamento
   * @example 'Dc. Jorge'
   */
  @IsString()
  leader: string;
}
