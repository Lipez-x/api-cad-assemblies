import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class RegisterUserDto {
  @IsEmail()
  email: string;
  @IsEnum(UserRole)
  role: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;

  confirmPassword: string;
}
