import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  leader: string;
}
