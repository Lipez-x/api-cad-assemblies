import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { CreateCongregationDto } from './dtos/create-congregation.dto';
import { updateCongregationDto } from './dtos/update-congregation.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CongregationService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private logger = new Logger(CongregationService.name);

  clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  createCongregation(createCongregationPayload: CreateCongregationDto) {
    try {
      this.clientAdminBackend.emit(
        'create-congregation',
        createCongregationPayload,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getCongregations(id: string) {
    const congregation = await lastValueFrom(
      this.clientAdminBackend.send('get-congregations', id ? id : ''),
    );

    if (!congregation) {
      throw new NotFoundException('Congregation not found');
    }

    try {
      return congregation;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateCongregation(
    id: string,
    updateCongregationDto: updateCongregationDto,
  ) {
    const congregation = await lastValueFrom(
      this.clientAdminBackend.send('get-congregations', id),
    );

    if (!congregation) {
      throw new NotFoundException('Congregation not found');
    }
    try {
      this.clientAdminBackend.emit('update-congregation', {
        id,
        updateCongregationDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCongregation(id: string) {
    const congregation = await lastValueFrom(
      this.clientAdminBackend.send('get-congregations', id),
    );

    if (!congregation) {
      throw new NotFoundException('Congregation not found');
    }
    try {
      this.clientAdminBackend.emit('delete-congregation', id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
