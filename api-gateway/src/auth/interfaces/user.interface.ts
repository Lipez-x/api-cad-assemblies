import { IsEmail } from 'class-validator';
import { UserRole } from 'src/users/enums/user-role.enum';

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  password: string;
  recoveryCode: string;
}
