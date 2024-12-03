import { IsObject, IsOptional, IsString } from 'class-validator';

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

class Address {
  street: string;
  number: string | number;
  neighborhood: string;
}
