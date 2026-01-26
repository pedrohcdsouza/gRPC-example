import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SseService } from './sse.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ecommerce',
          protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
          url: 'inventory-service:3002',
        },
      },
      {
        name: 'PAYMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ecommerce',
          protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
          url: 'payment-service:3003',
        },
      },
      {
        name: 'SHIPPING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ecommerce',
          protoPath: join(process.cwd(), 'proto/ecommerce.proto'),
          url: 'shipping-service:3004',
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, SseService],
})
export class GatewayModule {}
