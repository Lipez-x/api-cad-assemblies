import { Controller } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}
}
