import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ecommerce',
        protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
        url: '0.0.0.0:3002',
      },
    },
  );

  await app.listen();
  const logger = new Logger('InventoryBootstrap');
  logger.log('Inventory Service is listening on gRPC port 3002...');
}
bootstrap();
