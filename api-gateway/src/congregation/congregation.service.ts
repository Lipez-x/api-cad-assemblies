import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';
import { CreateCongregationDto } from './dtos/create-congregation.dto';
import { updateCongregationDto } from './dtos/update-congregation.dto';

@Injectable()
export class CongregationService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private logger = new Logger(CongregationService.name);

  private clientAdminBackend =
    this.clientProxyCadAssemblies.getClientProxyAdminBackendInstance();

  async createCongregation(createCongregationPayload: CreateCongregationDto) {
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

  getCongregations(id: string) {
    throw new Error('Method not implemented.');
  }

  updateCongregation(id: string, updateCongregationDto: updateCongregationDto) {
    throw new Error('Method not implemented.');
  }

  deleteCongregation(id: string) {
    throw new Error('Method not implemented.');
  }
}
