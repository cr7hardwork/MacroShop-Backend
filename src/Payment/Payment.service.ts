import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe('sk_test_51R51DoEQBo2jbhtYYuVjn1gCz4rmDP8TLtu9m3U27UOsUqY7g43X5StPA0VbAG5lmipuIzN1YjuSCzwIYuPVUhpu00JD0xLjsE', { apiVersion: '2025-02-24.acacia' });
    }

    async createPayment(amount: number) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: 'usd',
        });

        return { clientSecret: paymentIntent.client_secret };
    }
}
