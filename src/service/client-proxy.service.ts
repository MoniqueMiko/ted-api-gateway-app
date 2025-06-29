import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';

@Injectable()
export class ClientProxyService {
  public client: ClientProxy;

  constructor(private configService: ConfigService) {
    const options: ClientOptions = {
      transport: Transport.REDIS,
      options: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
        retryAttempts: 10,
        retryDelay: 3000
      },
    };

    this.client = ClientProxyFactory.create(options);
  }
}