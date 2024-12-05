import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from './schemas/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Members') private readonly membersMode: Model<Members>,
  ) {}
}
