import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
