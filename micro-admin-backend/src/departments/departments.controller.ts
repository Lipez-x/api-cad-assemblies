import { Controller, Logger } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateDepartmentPayload } from './interfaces/create-department.payload';
import { UpdateDepartmentPayload } from './interfaces/update-department.payload';

const ackErrors: string[] = ['E11000', 'Cast to ObjectId'];

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  private logger = new Logger(DepartmentsController.name);

  @EventPattern('create-department')
  async createDepartment(
    @Ctx() context: RmqContext,
    @Payload() createDepartmentPayload: CreateDepartmentPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      this.departmentsService.createDepartment(createDepartmentPayload);
      await channel.ack(message);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }

  @MessagePattern('get-departments')
  async getDepartments(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      if (id) {
        return await this.departmentsService.findDepartmentById(id);
      } else {
        return await this.departmentsService.findAllDepartments();
      }
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('update-department')
  async updateDepartment(
    @Ctx() context: RmqContext,
    @Payload() updateDepartmentPayload: UpdateDepartmentPayload,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      this.departmentsService.updateDepartment(updateDepartmentPayload);
      await channel.ack(message);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }

  @EventPattern('delete-department')
  async deleteDepartment(@Ctx() context: RmqContext, @Payload() id: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      this.departmentsService.deleteDepartment(id);
      await channel.ack(message);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }

  @EventPattern('add-department-member')
  async addMember(
    @Ctx() context: RmqContext,
    @Payload() { id, memberId }: { id: string; memberId: string },
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      this.departmentsService.addMember(id, memberId);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }

  @EventPattern('remove-department-member')
  async removeMember(
    @Ctx() context: RmqContext,
    @Payload() { id, memberId }: { id: string; memberId: string },
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      this.departmentsService.removeMember(id, memberId);
    } catch (error) {
      this.logger.error(error.message);
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(message);
      }
    }
  }
}
