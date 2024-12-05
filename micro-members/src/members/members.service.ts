import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from './schemas/members.schema';
import { CreateMemberPayload } from './interfaces/create-member-payload.interface';
import { UpdateMemberPayload } from './interfaces/update-member.payload';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Members') private readonly membersMode: Model<Members>,
  ) {}

  async createMember(createMemberPayload: CreateMemberPayload) {}
  async findMemberById(id: string) {}
  async findAllMembers() {}
  async updateMember(updateMemberPayload: UpdateMemberPayload) {}
  async deleteMember(id: string) {}
}
