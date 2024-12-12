import { Address } from './address.interface';
import { EcclesiasticalData } from './ecclesiastical-data.interface';

export interface UpdateMemberPayload {
  id: string;
  updateMemberDto: {
    name: string;
    address: Address;
    phoneNumber: string;
    scholarity: string;
    profession: string;
    civilStatus: string;
    spouseName: string;
    motherName: string;
    fatherName: string;
    weddingDate: Date;
    urlImage: string;
    ecclesiasticalData: EcclesiasticalData;
  };
}
