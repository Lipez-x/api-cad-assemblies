import { Matches } from 'class-validator';

export class ConfirmPasswordDto {
  email: string;
  recoveryCode: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Invalid password',
  })
  newPassword: string;
}
