import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [ProxyrmqModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
