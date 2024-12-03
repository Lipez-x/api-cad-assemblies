import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CreateCongregationDto } from './dtos/create-congregation.dto';
import { updateCongregationDto } from './dtos/update-congregation.dto';

@Controller('api/v1/congregation')
export class CongregationController {
  constructor(private readonly congregationService: CongregationService) {}

  private logger = new Logger(CongregationController.name);

  @Post()
  async createCongregation(
    @Body() createCongregationPayload: CreateCongregationDto,
  ) {
    this.logger.log(
      `Congregation: ${JSON.stringify(createCongregationPayload)}`,
    );

    return await this.congregationService.createCongregation(
      createCongregationPayload,
    );
  }

  @Get()
  async getCongregations(@Query('id') id: string) {
    return await this.congregationService.getCongregations(id);
  }

  @Post('/:id')
  async updateCongregation(
    @Param('id') id: string,
    @Body() updateCongregationDto: updateCongregationDto,
  ) {
    this.logger.log(
      `Congregation: ${id}, update body: ${JSON.stringify(updateCongregationDto)}`,
    );
    await this.congregationService.updateCongregation(
      id,
      updateCongregationDto,
    );
  }

  @Delete('/:id')
  async deleteCongregation(@Param('id') id: string) {
    this.logger.log(`Delete Congregation: ${id}`);
    await this.congregationService.deleteCongregation(id);
  }
}
