import { Controller, Get, Logger } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  private readonly logger = new Logger(OrderServiceController.name);
  constructor(private readonly ordeServiceService: OrderServiceService) {}

  @Get()
  getHello(): string {
    return this.ordeServiceService.getHello();
  }

  @GrpcMethod('OrderService', 'CancelOrder')
  async cancelOrder(@Payload() data: any) {
    try {
      this.logger.log(`Received CancelOrder request: ${data.orderId}`);
      await this.ordeServiceService.cancelOrder(data.orderId, data.reason);
      return { success: true };
    } catch (error) {
      this.logger.error('Error processing CancelOrder', error as any);
      return { success: false, message: error.message };
    }
  }

  @GrpcMethod('OrderService', 'CompleteOrder')
  async completeOrder(@Payload() data: any) {
    try {
      this.logger.log(`Received CompleteOrder request: ${data.orderId}`);
      await this.ordeServiceService.completeOrder(data.orderId);
      return { success: true };
    } catch (error) {
      this.logger.error('Error processing CompleteOrder', error as any);
      return { success: false, message: error.message };
    }
  }
}
