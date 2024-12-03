import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateCongregationPayload } from './interfaces/update-congregation.payload';
import { CreateCongregationPayload } from './interfaces/create-congregation.payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Congregation } from './interfaces/congregations.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CongregationsService {
  constructor(
    @InjectModel('Congregations')
    private readonly congregationsModel: Model<Congregation>,
  ) {}

  private logger = new Logger(CongregationsService.name);

  async createCongregation(
    createCongregationPayload: CreateCongregationPayload,
  ) {
    const { name, leader, address } = createCongregationPayload;
    try {
      const createdCongregation = new this.congregationsModel({
        name,
        leader,
        address,
      });

      return createdCongregation.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findAllCongregations() {
    try {
      return await this.congregationsModel.find().exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async findCongregationById(id: string) {
    const congregation = await this.congregationsModel.findById(id).exec();

    if (!congregation) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Congregation not found',
      });
    }

    try {
      return congregation;
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async updateCongregation(
    updateCongregationPayload: UpdateCongregationPayload,
  ) {
    try {
      const { id, updateCongregationDto } = updateCongregationPayload;

      await this.congregationsModel.findByIdAndUpdate(id, {
        $set: updateCongregationDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async deleteCongregation(id: string) {
    try {
      await this.congregationsModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
