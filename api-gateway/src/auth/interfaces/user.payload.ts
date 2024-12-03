import mongoose from 'mongoose';
import { UserRole } from 'src/users/enums/user-role.enum';

export interface UserPayload {
  sub: string | unknown;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
