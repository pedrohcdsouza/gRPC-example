import { Controller, Get, Logger } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  private readonly logger = new Logger(PaymentServiceController.name);
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @Get()
  getHello(): string {
    return this.paymentServiceService.getHello();
  }

  @GrpcMethod('PaymentService', 'ProcessPayment')
  async processPayment(@Payload() data: any) {
    try {
      this.logger.log(`Received ProcessPayment request: ${data.orderId}`);
      return await this.paymentServiceService.processPayment(data);
    } catch (error) {
      this.logger.error('Error processing ProcessPayment', error as any);
      return { success: false, message: error.message };
    }
  }
}
