import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyCadAssemblies {
  private RMQ_USER = process.env.RMQ_USER;
  private RMQ_PASSWORD = process.env.RMQ_PASSWORD;
  private RMQ_ADDRESS = process.env.RMQ_ADDRESS;

  getClientProxyAuthInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${this.RMQ_USER}:${this.RMQ_PASSWORD}@${this.RMQ_ADDRESS}/cadassemblies`,
        ],
        queue: 'auth',
      },
    });
  }

  getClientProxyAdminBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${this.RMQ_USER}:${this.RMQ_PASSWORD}@${this.RMQ_ADDRESS}/cadassemblies`,
        ],
        queue: 'admin-backend',
      },
    });
  }
}
