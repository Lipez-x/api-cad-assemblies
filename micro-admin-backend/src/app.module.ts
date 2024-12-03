import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongregationsModule } from './congregations/congregations.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u30gd.mongodb.net/cadaadmbackend?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    CongregationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
