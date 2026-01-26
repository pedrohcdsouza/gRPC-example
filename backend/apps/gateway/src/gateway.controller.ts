import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Logger,
  Sse,
  MessageEvent,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SseService } from './sse.service';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  CreateOrderDto,
  OrderResponseDto,
  ProductDto,
} from './dto/gateway.dto';
import { OrderStatus, OrderStatusMessages } from '../../common/dto/events.dto';
import { Observable, map, firstValueFrom } from 'rxjs';

interface InventoryService {
  reserveStock(data: any): Observable<any>;
}

interface PaymentService {
  processPayment(data: any): Observable<any>;
}

interface ShippingService {
  createShipment(data: any): Observable<any>;
}

@Controller()
export class GatewayController implements OnModuleInit {
  private readonly logger = new Logger(GatewayController.name);
  private orders: Map<number, OrderResponseDto> = new Map();
  private orderIdCounter = 1;

  private inventoryService: InventoryService;
  private paymentService: PaymentService;
  private shippingService: ShippingService;

  // Produtos disponíveis (sincronizado com Inventory Service)
  private products: ProductDto[] = [
    { id: 1, name: 'Notebook', price: 2500, stock: 10 },
    { id: 2, name: 'Mouse', price: 50, stock: 50 },
    { id: 3, name: 'Teclado', price: 150, stock: 30 },
  ];

  constructor(
    private readonly gatewayService: GatewayService,
    private readonly sseService: SseService,
    @Inject('INVENTORY_PACKAGE') private inventoryClient: ClientGrpc,
    @Inject('PAYMENT_PACKAGE') private paymentClient: ClientGrpc,
    @Inject('SHIPPING_PACKAGE') private shippingClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.inventoryService =
      this.inventoryClient.getService<InventoryService>('InventoryService');
    this.paymentService =
      this.paymentClient.getService<PaymentService>('PaymentService');
    this.shippingService =
      this.shippingClient.getService<ShippingService>('ShippingService');
  }

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  // Endpoint SSE para streaming de atualizações em tempo real
  @Sse('orders/events')
  orderEvents(): Observable<MessageEvent> {
    this.logger.log('Client connected to SSE stream');
    return this.sseService.getOrderUpdates().pipe(
      map(
        (event) =>
          ({
            data: JSON.stringify(event),
          }) as MessageEvent,
      ),
    );
  }

  @Get('products')
  getProducts(): ProductDto[] {
    this.logger.debug('Getting products list');
    return this.products;
  }

  @Get('orders')
  getOrders(): OrderResponseDto[] {
    return Array.from(this.orders.values());
  }

  @Get('orders/:id')
  getOrder(@Param('id') id: string): OrderResponseDto | { error: string } {
    const orderId = parseInt(id, 10);
    const order = this.orders.get(orderId);

    if (!order) {
      this.logger.warn(`Order not found: ${orderId}`);
      return { error: 'Order not found' };
    }

    this.logger.debug(`Getting order: ${orderId}`);
    return order;
  }

  @Post('orders')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    this.logger.log(
      `Creating new order for customer ${createOrderDto.customerId}`,
    );

    // Calcular total estimado
    let estimatedTotal = 0;
    for (const item of createOrderDto.items) {
      const product = this.products.find((p) => p.id === item.productId);
      if (product) {
        estimatedTotal += product.price * item.quantity;
      }
    }

    const orderId = this.orderIdCounter++;
    const order: OrderResponseDto = {
      id: orderId,
      customerId: createOrderDto.customerId,
      items: createOrderDto.items,
      status: OrderStatus.PENDING,
      total: estimatedTotal,
    };

    this.orders.set(orderId, order);

    // 1. PENDING
    this.emitUpdate(orderId, OrderStatus.PENDING, 'gateway');

    try {
      // 2. Reserve Stock (Inventory)
      this.logger.log(`Calling Inventory Service for order ${orderId}`);
      const inventoryResponse = await firstValueFrom(
        this.inventoryService.reserveStock({
          orderId,
          customerId: createOrderDto.customerId,
          items: createOrderDto.items,
        }),
      );

      if (!inventoryResponse.success) {
        throw new Error(inventoryResponse.message || 'Failed to reserve stock');
      }

      order.status = OrderStatus.INVENTORY_CONFIRMED;
      order.total = inventoryResponse.total;
      this.emitUpdate(
        orderId,
        OrderStatus.INVENTORY_CONFIRMED,
        'inventory-service',
      );

      // 3. Process Payment
      this.logger.log(`Calling Payment Service for order ${orderId}`);
      const paymentResponse = await firstValueFrom(
        this.paymentService.processPayment({
          orderId,
          amount: order.total,
        }),
      );

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message || 'Payment failed');
      }

      order.status = OrderStatus.PAYMENT_CONFIRMED;
      this.emitUpdate(
        orderId,
        OrderStatus.PAYMENT_CONFIRMED,
        'payment-service',
      );

      // 4. Create Shipment
      this.logger.log(`Calling Shipping Service for order ${orderId}`);
      const shippingResponse = await firstValueFrom(
        this.shippingService.createShipment({
          orderId,
        }),
      );

      if (!shippingResponse.success) {
        throw new Error(shippingResponse.message || 'Shipping failed');
      }

      order.status = OrderStatus.SHIPPED;
      this.emitUpdate(
        orderId,
        OrderStatus.SHIPPED,
        'shipping-service',
        `Rastreio: ${shippingResponse.trackingCode}`,
      );

      // Final status
      order.status = OrderStatus.COMPLETED;
      this.emitUpdate(orderId, OrderStatus.COMPLETED, 'shipping-service');
    } catch (error) {
      this.logger.error(`Order flow failed for ${orderId}: ${error.message}`);
      order.status = OrderStatus.CANCELLED;
      this.emitUpdate(orderId, OrderStatus.CANCELLED, 'gateway', error.message);
    }

    return order;
  }

  private emitUpdate(
    orderId: number,
    status: OrderStatus,
    service: string,
    extraMessage?: string,
  ) {
    let message = OrderStatusMessages[status];
    if (extraMessage) message += ` - ${extraMessage}`;

    this.sseService.emitOrderUpdate({
      orderId,
      status,
      message,
      timestamp: new Date(),
      service,
    });
  }
}
