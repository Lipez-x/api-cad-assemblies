import { IsObject, IsString } from 'class-validator';
import { Address } from 'src/common/interfaces/address.interface';

export class CreateCongregationDto {
  @IsString()
  name: string;
  @IsString()
  leader: string;
  @IsObject()
  address: Address;
}
