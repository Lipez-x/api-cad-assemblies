import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Roles(UserRole.ADMIN, UserRole.ADMIN)
@Controller('api/v1/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  private logger = new Logger(MembersController.name);

  @Post()
  @UsePipes(ValidationPipe)
  createMember(@Body() createMemberDto: CreateMemberDto) {
    this.logger.log(`Member: ${JSON.stringify(createMemberDto)}`);
  }
}
