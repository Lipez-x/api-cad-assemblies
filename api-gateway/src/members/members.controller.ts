import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';

@Controller('api/v1/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createMember(@Body() createMemberDto: CreateMemberDto) {}
}
