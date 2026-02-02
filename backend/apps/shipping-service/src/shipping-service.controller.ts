import { Controller, Get, Logger } from '@nestjs/common';
import { ShippingServiceService } from './shipping-service.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller()
export class ShippingServiceController {
  private readonly logger = new Logger(ShippingServiceController.name);
  constructor(
    private readonly shippingServiceService: ShippingServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.shippingServiceService.getHello();
  }

  @GrpcMethod('ShippingService', 'CreateShipment')
  async createShipment(@Payload() data: any) {
    try {
      this.logger.log(`Received CreateShipment request: ${data.orderId}`);
      return await this.shippingServiceService.createShipment(data);
    } catch (error) {
      this.logger.error('Error processing CreateShipment', error as any);
      return { success: false, message: error.message };
    }
  }
}
