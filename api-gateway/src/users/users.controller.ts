import {
  Body,
  Controller,
  Logger,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './users.service';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { ConfirmPasswordDto } from './dtos/confirm-password.dto';

@Controller('api/v1/users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log(`User: ${JSON.stringify(registerUserDto)}`);
    return this.usersService.register(registerUserDto);
  }

  @IsPublic()
  @Post('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }) {
    await this.usersService.forgotPassword(email);
  }

  @IsPublic()
  @Post('confirm-password')
  @UsePipes(ValidationPipe)
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    await this.usersService.confirmPassword(confirmPasswordDto);
  }
}
