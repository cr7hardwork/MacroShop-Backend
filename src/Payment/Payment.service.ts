import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from './payment.repository';
import { PaymentStatus } from './Payment';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { log } from 'console';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderRepository: OrderRepository,
  ) {
    this.stripe = new Stripe(
      'sk_test_51R51DoEQBo2jbhtYYuVjn1gCz4rmDP8TLtu9m3U27UOsUqY7g43X5StPA0VbAG5lmipuIzN1YjuSCzwIYuPVUhpu00JD0xLjsE',
      { apiVersion: '2025-02-24.acacia' },
    );
  }

  async createPayment(amount: number, order_id: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      description: `Оплата заказа ${order_id}`,
    });

    const orderPayment = await this.paymentRepository.createOrderPayment(
      order_id,
      PaymentStatus.PENDING,
    );

    return { clientSecret: paymentIntent.client_secret, orderPayment };
  }
}
