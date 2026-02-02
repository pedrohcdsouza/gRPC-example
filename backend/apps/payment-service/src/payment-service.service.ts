import { Injectable, Logger } from '@nestjs/common';

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: string;
}

@Injectable()
export class PaymentServiceService {
  private readonly logger = new Logger(PaymentServiceService.name);
  private payments: Payment[] = [];
  private paymentIdCounter = 1;

  constructor() {}

  getHello(): string {
    return 'Payment Service is running!';
  }

  async processPayment(inventoryEvent: any): Promise<any> {
    this.logger.log(`Processing payment for order: ${inventoryEvent.orderId}`);

    const paymentId = this.paymentIdCounter++;

    // Simular processamento com 10% de chance de falha
    const shouldFail = Math.random() < 0.1;

    if (shouldFail) {
      this.logger.warn(`Payment FAILED for order: ${inventoryEvent.orderId}`);

      const payment: Payment = {
        id: paymentId,
        orderId: inventoryEvent.orderId,
        amount: inventoryEvent.amount,
        status: 'FAILED',
      };
      this.payments.push(payment);

      return {
        orderId: inventoryEvent.orderId,
        paymentId,
        success: false,
        message:
          'Payment processing failed - Insufficient funds or card declined',
      };
    }

    // Pagamento aprovado
    this.logger.log(
      `Payment APPROVED for order: ${inventoryEvent.orderId} Amount: ${inventoryEvent.amount}`,
    );

    const payment: Payment = {
      id: paymentId,
      orderId: inventoryEvent.orderId,
      amount: inventoryEvent.amount,
      status: 'APPROVED',
    };
    this.payments.push(payment);

    return {
      orderId: inventoryEvent.orderId,
      paymentId,
      success: true,
      message: 'Payment approved',
    };
  }
}
