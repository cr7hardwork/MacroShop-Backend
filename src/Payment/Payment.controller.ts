import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./Payment.service";

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('create-payment')
    async createPayment(@Body() body: { amount: number }) {
        return this.paymentService.createPayment(body.amount);
    }
}
