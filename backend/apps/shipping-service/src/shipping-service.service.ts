import { Injectable, Logger } from '@nestjs/common';

interface Shipment {
  id: number;
  orderId: number;
  trackingCode: string;
  status: string;
}

@Injectable()
export class ShippingServiceService {
  private readonly logger = new Logger(ShippingServiceService.name);
  private shipments: Shipment[] = [];
  private shipmentIdCounter = 1;

  constructor() {}

  getHello(): string {
    return 'Shipping Service is running!';
  }

  async createShipment(paymentEvent: any): Promise<any> {
    this.logger.log(`Creating shipment for order: ${paymentEvent.orderId}`);

    const shipmentId = this.shipmentIdCounter++;
    const trackingCode = `TRK${Date.now()}${shipmentId}`;

    const shipment: Shipment = {
      id: shipmentId,
      orderId: paymentEvent.orderId,
      trackingCode,
      status: 'CREATED',
    };

    this.shipments.push(shipment);

    this.logger.log(`Shipment created: ${trackingCode}`);

    // Simular entrega após 5 segundos (apenas log local agora)
    setTimeout(() => {
      this.deliverShipment(shipment);
    }, 5000);

    return {
      orderId: paymentEvent.orderId,
      shipmentId,
      trackingCode,
      success: true,
    };
  }

  private async deliverShipment(shipment: Shipment): Promise<void> {
    this.logger.log(`Delivering shipment: ${shipment.trackingCode}`);
    shipment.status = 'DELIVERED';
    this.logger.log(`Shipment delivered: ${shipment.trackingCode}`);
  }
}
