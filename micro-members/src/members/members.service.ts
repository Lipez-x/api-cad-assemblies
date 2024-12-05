import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from './schemas/members.schema';
import { CreateMemberPayload } from './interfaces/create-member-payload.interface';
import { UpdateMemberPayload } from './interfaces/update-member.payload';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Members') private readonly membersModel: Model<Members>,
  ) {}

  private logger = new Logger(MembersService.name);

  async createMember(createMemberPayload: CreateMemberPayload) {
    try {
      console.log(createMemberPayload);

      const createdMember = new this.membersModel(createMemberPayload);

      console.log(createdMember);

      await createdMember.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findMemberById(id: string) {
    try {
      const member = await this.membersModel.findById(id).exec();
      return member;
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findAllMembers() {
    try {
      return await this.membersModel.find().exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async updateMember(updateMemberPayload: UpdateMemberPayload) {
    try {
      const { id, updateMemberDto } = updateMemberPayload;

      await this.membersModel.findByIdAndUpdate(id, { $set: updateMemberDto });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async deleteMember(id: string) {
    try {
      await this.membersModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
