import { Controller } from '@nestjs/common';
import { CongregationsService } from './congregations.service';

@Controller()
export class CongregationsController {
  constructor(private readonly congregationsService: CongregationsService) {}
}
