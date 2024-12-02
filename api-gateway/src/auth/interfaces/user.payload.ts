import mongoose from 'mongoose';

export interface UserPayload {
  sub: string | unknown;
  login: string;
  email: string;
  iat?: number;
  exp?: number;
}
