import { Module } from '@nestjs/common';
import { ClientProxyCadAssemblies } from './client-proxy';

@Module({
  providers: [ClientProxyCadAssemblies],
  exports: [ClientProxyCadAssemblies],
})
export class ProxyrmqModule {}
