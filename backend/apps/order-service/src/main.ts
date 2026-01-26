import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ecommerce',
        protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
        url: '0.0.0.0:3001',
      },
    },
  );

  await app.listen();
  const logger = new Logger('OrderBootstrap');
  logger.log('Order Service is listening on gRPC port 3001...');
}
bootstrap();
