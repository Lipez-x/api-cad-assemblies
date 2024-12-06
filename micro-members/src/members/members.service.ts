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

  private clientMembers =
    this.clientProxyCadAssemblies.getClientMembersInstance();

  private clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  private logger = new Logger(MembersService.name);

  async addMemberToDepartment(department: string, member: Members) {
    const membersDepartment: Department = await lastValueFrom(
      this.clientAdminBackend.send(
        'get-departments',
        member.ecclesiasticalData.department,
      ),
    );
    const existsDepartments: Department = await lastValueFrom(
      this.clientAdminBackend.send('get-departments', department),
    );

    if (existsDepartments._id !== membersDepartment._id) {
      const memberIndex = membersDepartment.members.findIndex(
        (i) => i == member._id,
      );

      if (memberIndex !== -1) {
        membersDepartment.members.splice(memberIndex, 1);
        this.clientAdminBackend.emit('update-department', {
          id: member.ecclesiasticalData.department,
          updateDepartmentDto: membersDepartment,
        });
      }
    }
    existsDepartments.members.push(member);
    this.clientAdminBackend.emit('update-department', {
      id: department,
      updateDepartmentDto: existsDepartments,
    });
  }

  async addMemberToCongregation(congregation: string, member: Members) {
    const memberCongregation: Congregation = await lastValueFrom(
      this.clientAdminBackend.send(
        'get-congregations',
        member.ecclesiasticalData.congregation,
      ),
    );

    const existsCongregation: Congregation = await lastValueFrom(
      this.clientAdminBackend.send('get-congregations', congregation),
    );

    if (existsCongregation._id !== memberCongregation._id) {
      const memberIndex = memberCongregation.members.findIndex(
        (i) => i == member._id,
      );

      if (memberIndex !== -1) {
        memberCongregation.members.splice(memberIndex, 1);
        this.clientAdminBackend.emit('update-congregation', {
          id: member.ecclesiasticalData.congregation,
          updateCongregationDto: memberCongregation,
        });
      }
    }

    existsCongregation.members.push(member);
    this.clientAdminBackend.emit('update-congregation', {
      id: congregation,
      updateCongregationDto: existsCongregation,
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

      const member = await lastValueFrom(
        this.clientMembers.send('get-members', id),
      );

      await this.membersModel.findByIdAndUpdate(id, {
        $set: updateMemberDto,
      });

      console.log(updateMemberDto.ecclesiasticalData.congregation);

      if (updateMemberDto.ecclesiasticalData.congregation) {
        await this.addMemberToCongregation(
          updateMemberDto.ecclesiasticalData.congregation,
          member,
        );
      }
      if (updateMemberDto.ecclesiasticalData.department) {
        await this.addMemberToDepartment(
          updateMemberDto.ecclesiasticalData.department,
          member,
        );
      }
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
