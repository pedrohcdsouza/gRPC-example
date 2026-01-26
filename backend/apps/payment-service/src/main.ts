import { NestFactory } from '@nestjs/core';
import { PaymentServiceModule } from './payment-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ecommerce',
        protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
        url: '0.0.0.0:3003',
      },
    },
  );

  await app.listen();
  const logger = new Logger('PaymentBootstrap');
  logger.log('Payment Service is listening on gRPC port 3003...');
}

bootstrap();
