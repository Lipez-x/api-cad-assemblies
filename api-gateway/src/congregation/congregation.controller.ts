import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CreateCongregationDto } from './dtos/create-congregation.dto';
import { updateCongregationDto } from './dtos/update-congregation.dto';

@Controller('api/v1/congregation')
export class CongregationController {
  constructor(private readonly congregationService: CongregationService) {}

  private logger = new Logger(CongregationController.name);

  @Post()
  @UsePipes(ValidationPipe)
  createCongregation(@Body() createCongregationPayload: CreateCongregationDto) {
    this.logger.log(
      `Congregation: ${JSON.stringify(createCongregationPayload)}`,
    );

    this.congregationService.createCongregation(createCongregationPayload);
  }

  @Get()
  async getCongregations(@Query('id') id: string) {
    return await this.congregationService.getCongregations(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateCongregation(
    @Param('id') id: string,
    @Body() updateCongregationDto: updateCongregationDto,
  ) {
    this.logger.log(
      `Congregation: ${id}, update body: ${JSON.stringify(updateCongregationDto)}`,
    );
    this.congregationService.updateCongregation(id, updateCongregationDto);
  }

  @Delete('/:id')
  deleteCongregation(@Param('id') id: string) {
    this.logger.log(`Delete Congregation: ${id}`);
    this.congregationService.deleteCongregation(id);
  }
}
