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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { BaptismHolySpiritDto } from './dtos/baptism-holy-spirit.dto';
import { Position } from 'src/common/interfaces/position.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Roles(UserRole.ADMIN, UserRole.COLLABORATOR)
@Controller('api/v1/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  private logger = new Logger(MembersController.name);

  @Get('/history/:id')
  async getHistory(@Param('id') member: string) {
    return await this.membersService.getHistory(member);
  }

  @Put('/history/:id')
  async addPosition(@Param('id') member: string, @Body() position: Position) {
    return await this.membersService.addPosition(member, position);
  }

  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any, @Param('id') id: string) {
    return await this.membersService.uploadImage(file, id);
  }

  @Put('/baptism-holy-spirit/:id')
  @UsePipes(ValidationPipe)
  async baptismHolySpirit(
    @Param('id') id: string,
    @Body() baptismHolyEspiritDto: BaptismHolySpiritDto,
  ) {
    this.logger.log(`Date: ${baptismHolyEspiritDto.date}`);
    await this.membersService.baptismHolySpirit(id, baptismHolyEspiritDto.date);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    this.logger.log(`Member: ${JSON.stringify(createMemberDto)}`);
    await this.membersService.createMember(createMemberDto);
  }

  @Get()
  async getMembers(@Query('id') id: string) {
    return await this.membersService.getMembers(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    this.logger.log(`Member '${id}': ${JSON.stringify(updateMemberDto)}`);
    await this.membersService.updateMember(id, updateMemberDto);
  }

  @Delete('/:id')
  async deleteMember(@Param('id') id: string) {
    this.logger.log(`Delete member: ${JSON.stringify(id)}`);
    await this.membersService.deleteMember(id);
  }
}
