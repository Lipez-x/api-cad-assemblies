import mongoose from 'mongoose';

export interface User {
  _id: string;
  login: string;
  email: string;
  password: string;
}
