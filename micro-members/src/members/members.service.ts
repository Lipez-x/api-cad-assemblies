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

  async createMember(createMemberPayload: CreateMemberPayload) {
    try {
      const { congregation, department } =
        createMemberPayload.ecclesiasticalData;

      const existsCongregation: Congregation = await lastValueFrom(
        this.clientAdminBackend.send('get-congregations', congregation),
      );

      const createdMember = new this.membersModel(createMemberPayload);

      await createdMember.save();

      existsCongregation.members.push(createdMember.id);

      this.clientAdminBackend.emit('update-congregation', {
        id: congregation,
        updateCongregationDto: existsCongregation,
      });

      if (department) {
        const existsDepartments: Department = await lastValueFrom(
          this.clientAdminBackend.send('get-departments', department),
        );

        existsDepartments.members.push(createdMember);
        this.clientAdminBackend.emit('update-department', {
          id: department,
          updateDepartmentDto: existsDepartments,
        });
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
