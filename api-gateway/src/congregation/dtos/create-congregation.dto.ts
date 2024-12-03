import { IsObject, IsString } from 'class-validator';

class Address {
  street: string;
  number: string | number;
  neighborhood: string;
}
export class CreateCongregationDto {
  @IsString()
  name: string;
  @IsString()
  leader: string;
  @IsObject()
  address: Address;
}
