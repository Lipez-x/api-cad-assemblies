import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MembersService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private clientMembers =
    this.clientProxyCadAssemblies.getClientMembersInstance();

  private clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  private logger = new Logger(MembersService.name);

  async baptismHolySpirit(id: string, baptismHolySpiritDate: Date) {
    const member = await lastValueFrom(
      this.clientMembers.send('get-members', id ? id : ''),
    );

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    try {
      this.clientMembers.emit('baptism-holy-spirit', {
        id,
        baptismHolySpiritDate,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMember(createMemberDto: CreateMemberDto) {
    const { congregation, department } = createMemberDto.ecclesiasticalData;

    const existsCongregation = await lastValueFrom(
      this.clientAdminBackend.send('get-congregations', congregation),
    );

    if (!existsCongregation) {
      throw new NotFoundException('Congregation not found');
    }

    if (department) {
      const existsDepartments = await lastValueFrom(
        this.clientAdminBackend.send('get-departments', department),
      );

      if (!existsDepartments) {
        throw new NotFoundException('Department not found');
      }
    }

    try {
      this.clientMembers.emit('create-member', createMemberDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMembers(id: string) {
    const member = await lastValueFrom(
      this.clientMembers.send('get-members', id ? id : ''),
    );

    if (!member) {
      throw new NotFoundException('Member not found');
    }
    try {
      return member;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateMember(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await lastValueFrom(
      this.clientMembers.send('get-members', id ? id : ''),
    );

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    try {
      this.clientMembers.emit('update-member', { id, updateMemberDto });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteMember(id: string) {
    const member = await lastValueFrom(
      this.clientMembers.send('get-members', id ? id : ''),
    );

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    try {
      this.clientMembers.emit('delete-member', id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
