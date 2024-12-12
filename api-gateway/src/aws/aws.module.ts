import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3Config } from './aws-s3.config';

@Module({
  providers: [AwsS3Service, AwsS3Config],
  exports: [AwsS3Service],
})
export class AwsModule {}
