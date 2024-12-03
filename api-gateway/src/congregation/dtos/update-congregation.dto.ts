import { IsObject, IsOptional, IsString } from 'class-validator';

class Address {
  street: string;
  number: string | number;
  neighborhood: string;
}
export class updateCongregationDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  leader: string;
  @IsObject()
  @IsOptional()
  address: Address;
}
