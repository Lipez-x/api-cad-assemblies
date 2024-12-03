import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const RMQ_USER = process.env.RMQ_USER;
const RMQ_PASSWORD = process.env.RMQ_PASSWORD;
const RMQ_ADDRESS = process.env.RMQ_ADDRESS;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_ADDRESS}/cadassemblies`],
      noAcks: false,
      queue: 'admin-backend',
    },
  });

  await app.listen();
}
bootstrap();
