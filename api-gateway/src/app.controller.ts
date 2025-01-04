import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { User } from './auth/interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
