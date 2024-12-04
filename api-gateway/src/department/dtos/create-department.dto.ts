import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;
  @IsString()
  leader: string;
}
