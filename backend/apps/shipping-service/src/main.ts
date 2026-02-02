import { NestFactory } from '@nestjs/core';
import { ShippingServiceModule } from './shipping-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShippingServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ecommerce',
        protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
        url: '0.0.0.0:3004',
      },
    },
  );

  await app.listen();
  const logger = new Logger('ShippingBootstrap');
  logger.log('Shipping Service is listening on gRPC port 3004...');
}
bootstrap();
