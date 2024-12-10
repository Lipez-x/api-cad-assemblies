import { Injectable } from '@nestjs/common';
import { ClientProxyCadAssemblies } from 'src/proxyrmq/client-proxy';

@Injectable()
export class HistoryService {
  constructor(
    private readonly clientProxyCadAssemblies: ClientProxyCadAssemblies,
  ) {}

  private clientMembers =
    this.clientProxyCadAssemblies.getClientMembersInstance();
}
