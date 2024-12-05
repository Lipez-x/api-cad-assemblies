import { Address } from './address.interface';
import { EcclesiasticalData } from './ecclesiastical-data.interface';

export interface Members {
  name: string;
  rg: string;
  cpf: string;
  nationality: string;
  birthDate: Date;
  birthPlace: string;
  gender: string;
  address: Address;
  phoneNumber: string;
  scholarity: string;
  profession: string;
  civilStatus: string;
  spouseName?: string;
  motherName: string;
  fatherName: string;
  weddingDate?: Date;
  status: string;
  ecclesiasticalData: EcclesiasticalData;
}
