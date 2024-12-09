import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from './schemas/members.schema';
import { CreateMemberPayload } from './interfaces/create-member-payload.interface';
import { UpdateMemberPayload } from './interfaces/update-member.payload';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { lastValueFrom } from 'rxjs';
import { Congregation } from './interfaces/congregation.interface';
import { Department } from './interfaces/department.interface';

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

      const member = await this.membersModel.findById(id);

      if (updateMemberDto.ecclesiasticalData.congregation) {
        await this.addMemberToCongregation(
          updateMemberDto.ecclesiasticalData.congregation,
          member,
        );

        member.ecclesiasticalData.congregation =
          updateMemberDto.ecclesiasticalData.congregation;
      }

      if (updateMemberDto.ecclesiasticalData.department) {
        await this.addMemberToDepartment(
          updateMemberDto.ecclesiasticalData.department,
          member,
        );

        member.ecclesiasticalData.department =
          updateMemberDto.ecclesiasticalData.department;
      }

      const updatedMemberData = {
        ...member,
        ...updateMemberDto,
        ecclesiasticalData: {
          ...member.ecclesiasticalData,
          ...updateMemberDto.ecclesiasticalData,
        },
      };
      await this.membersModel.findByIdAndUpdate(id, {
        $set: updatedMemberData,
      });
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
