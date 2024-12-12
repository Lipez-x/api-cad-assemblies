import { Injectable, Logger } from '@nestjs/common';
import { AwsS3Config } from './aws-s3.config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  constructor(private readonly awsS3Config: AwsS3Config) {}

  private logger = new Logger(AwsS3Service.name);

  public async uploadFile(file: any, id: string) {
    try {
      const s3 = new S3Client({
        region: this.awsS3Config.AWS_REGION,
        credentials: {
          accessKeyId: this.awsS3Config.S3_USER_ACCESS_KEY_ID,
          secretAccessKey: this.awsS3Config.S3_USER_SECRET_ACCESS_KEY,
        },
      });

      const fileExtension = file.originalName.split('.').pop();

      const urlKey = `${id}.${fileExtension}`;

      const command = new PutObjectCommand({
        Body: file.buffer,
        Bucket: this.awsS3Config.AWS_S3_BUCKET,
        Key: urlKey,
      });

      await s3.send(command);

      return {
        url: `https://${this.awsS3Config.AWS_S3_BUCKET}.s3.${this.awsS3Config.AWS_REGION}.amazonaws.com/${urlKey}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new error.message();
    }
  }
}
