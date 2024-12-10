import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from './schemas/members.schema';
import { CreateMemberPayload } from './interfaces/create-member-payload.interface';
import { UpdateMemberPayload } from './interfaces/update-member.payload';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { EcclesiasticalData } from './schemas/ecclesiastical-data.schema';
import e from 'express';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Members') private readonly membersModel: Model<Members>,
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  private logger = new Logger(MembersService.name);

  async addMemberToDepartment(department: string, member: Members) {
    this.clientAdminBackend.emit('remove-department-member', {
      id: member.ecclesiasticalData.department,
      memberId: member._id,
    });

    this.clientAdminBackend.emit('add-department-member', {
      id: department,
      memberId: member._id,
    });
  }

  async addMemberToCongregation(congregation: string, member: Members) {
    this.clientAdminBackend.emit('remove-congregation-member', {
      id: member.ecclesiasticalData.congregation,
      memberId: member._id,
    });

    this.clientAdminBackend.emit('add-congregation-member', {
      id: congregation,
      memberId: member._id,
    });
  }

  async baptismHolySpirit(id: string, baptismHolySpiritDate: Date) {
    try {
      const member = await this.membersModel.findById(id);
      member.ecclesiasticalData.baptizedHolySpirit = true;
      member.ecclesiasticalData.baptizedHolySpiritDate = baptismHolySpiritDate;

      await this.membersModel.findByIdAndUpdate(id, { $set: member });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async createMember(createMemberPayload: CreateMemberPayload) {
    try {
      const { congregation, department } =
        createMemberPayload.ecclesiasticalData;

      const createdMember = new this.membersModel(createMemberPayload);
      await createdMember.save();

      await this.addMemberToCongregation(congregation, createdMember);

      if (department) {
        await this.addMemberToDepartment(department, createdMember);
      }
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

      const { ecclesiasticalData, ...memberData } = updateMemberDto;

      const member = await this.membersModel.findById(id);

      if (ecclesiasticalData && ecclesiasticalData.congregation) {
        await this.addMemberToCongregation(
          ecclesiasticalData.congregation,
          member,
        );
      }

      if (ecclesiasticalData && ecclesiasticalData.department) {
        await this.addMemberToDepartment(ecclesiasticalData.department, member);
      }

      Object.assign(member, memberData);
      member.ecclesiasticalData = {
        ...member.ecclesiasticalData,
        ...ecclesiasticalData,
      };

      await member.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async deleteMember(id: string) {
    try {
      const member = await this.membersModel.findById(id).exec();

      this.clientAdminBackend.emit('remove-department-member', {
        id: member.ecclesiasticalData.department,
        memberId: member._id,
      });

      this.clientAdminBackend.emit('remove-congregation-member', {
        id: member.ecclesiasticalData.congregation,
        memberId: member._id,
      });

      await this.membersModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
