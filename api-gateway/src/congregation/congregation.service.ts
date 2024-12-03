import {
  Injectable,
  InternalServerErrorException,
  Logger,
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
    try {
      return await lastValueFrom(
        this.clientAdminBackend.send('get-congregations', id ? id : ''),
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  updateCongregation(id: string, updateCongregationDto: updateCongregationDto) {
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

  deleteCongregation(id: string) {
    try {
      this.clientAdminBackend.emit('delete-congregation', id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
