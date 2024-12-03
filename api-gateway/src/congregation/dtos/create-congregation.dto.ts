import { IsObject, IsString } from 'class-validator';

export class CreateCongregationDto {
  @IsString()
  name: string;
  @IsString()
  leader: string;
  @IsObject()
  address: Address;
}

class Address {
  street: string;
  number: string | number;
  neighborhood: string;
}
