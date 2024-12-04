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
