import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsS3Config {
  public S3_USER_ACCESS_KEY_ID: string = process.env.S3_USER_ACCESS_KEY_ID;
  public S3_USER_SECRET_ACCESS_KEY: string =
    process.env.S3_USER_SECRET_ACCESS_KEY;
  public AWS_REGION: string = process.env.AWS_REGION;
  public AWS_S3_BUCKET: string = process.env.AWS_S3_BUCKET;
}
