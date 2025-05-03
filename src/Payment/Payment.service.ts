import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from './payment.repository';
import { PaymentStatus } from './Payment';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly paymentRepository: PaymentRepository,
  private configService: ConfigService 
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
      metadata: { order_id: order_id.toString() },
    });

    const orderPayment = await this.paymentRepository.createOrderPayment(
      order_id,
      PaymentStatus.PENDING,
    );

    return { clientSecret: paymentIntent.client_secret, orderPayment };
  }

  async handleWebhook(req: Request, signature: string) {
    const signinSecret = this.configService.get<string>('SIGNINSECRET');
    console.log(signinSecret);
    
  
    let event: Stripe.Event;
  
    try {
      event = this.stripe.webhooks.constructEvent(req.body, signature, signinSecret);
    } catch (err) {
      return { error: `Webhook Error: ${err.message}` };
    }
  
    switch (event.type) {
      case 'charge.updated':
        const charge = event.data.object as Stripe.Charge;
        const orderId = parseInt(charge.metadata.order_id, 10);
  
        if (charge.paid && charge.status === 'succeeded') {
          await this.paymentRepository.updateStatusByOrderId(orderId, PaymentStatus.SUCCESS);
        } else {
          await this.paymentRepository.updateStatusByOrderId(orderId, PaymentStatus.FAILED);
        }
        break;
  
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderIdFromIntent = parseInt(paymentIntent.metadata.order_id, 10);
  
        await this.paymentRepository.updateStatusByOrderId(orderIdFromIntent, PaymentStatus.SUCCESS);
        break;
    }
  
    return { received: true };
  }
}