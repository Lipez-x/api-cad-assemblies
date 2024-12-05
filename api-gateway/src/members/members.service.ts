import { Injectable } from '@nestjs/common';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MembersService {
  async createMember(createMemberDto: CreateMemberDto) {}
  async getMembers(id: string) {}
  async updateMember(id: string, updateMemberDto: UpdateMemberDto) {}
  async deleteMember(id: string) {}
}
