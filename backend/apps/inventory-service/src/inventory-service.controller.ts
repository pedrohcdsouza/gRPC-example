import { Controller, Get, Logger } from '@nestjs/common';
import { InventoryServiceService } from './inventory-service.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import {
  OrderCreatedEvent,
  OrderCancelledEvent,
} from '../../common/dto/events.dto';

@Controller()
export class InventoryServiceController {
  private readonly logger = new Logger(InventoryServiceController.name);
  constructor(
    private readonly inventoryServiceService: InventoryServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.inventoryServiceService.getHello();
  }

  @GrpcMethod('InventoryService', 'ReserveStock')
  async reserveStock(@Payload() data: OrderCreatedEvent) {
    try {
      this.logger.log(`Received ReserveStock request: ${data.orderId}`);
      return await this.inventoryServiceService.reserveStock(data);
    } catch (error) {
      this.logger.error('Error processing ReserveStock', error as any);
      return { success: false, message: error.message };
    }
  }

  @GrpcMethod('InventoryService', 'ReleaseStock')
  async releaseStock(@Payload() data: OrderCancelledEvent) {
    try {
      this.logger.log(`Received ReleaseStock request: ${data.orderId}`);
      await this.inventoryServiceService.releaseStock(data);
      return {};
    } catch (error) {
      this.logger.error('Error processing ReleaseStock', error as any);
      return {};
    }
  }
}
