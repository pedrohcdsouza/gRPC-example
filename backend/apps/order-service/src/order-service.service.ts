import { Injectable, Logger } from '@nestjs/common';

interface Order {
  id: number;
  customerId: number;
  items: { productId: number; quantity: number }[];
  status: string;
  total: number;
}

@Injectable()
export class OrderServiceService {
  private readonly logger = new Logger(OrderServiceService.name);
  private orders: Map<number, Order> = new Map();

  constructor() {}

  getHello(): string {
    return 'Order Service is running!';
  }

  async cancelOrder(orderId: number, reason: string): Promise<void> {
    this.logger.log(`Cancelling order ${orderId}. Reason: ${reason}`);

    const order = this.orders.get(orderId);
    if (!order) {
      this.logger.error(`Order ${orderId} not found`);
      return;
    }

    order.status = 'CANCELLED';
    this.orders.set(orderId, order);
    this.logger.log(`Order ${orderId} cancelled`);
  }

  async completeOrder(orderId: number): Promise<void> {
    this.logger.log(`Completing order ${orderId}`);

    const order = this.orders.get(orderId);
    if (!order) {
      this.logger.error(`Order ${orderId} not found`);
      return;
    }

    order.status = 'COMPLETED';
    this.orders.set(orderId, order);
    this.logger.log(`Order ${orderId} completed successfully!`);
  }

  registerOrder(order: Order): void {
    this.orders.set(order.id, order);
    this.logger.log(`Order ${order.id} registered`);
  }

  getOrder(orderId: number): Order | undefined {
    return this.orders.get(orderId);
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }
}
