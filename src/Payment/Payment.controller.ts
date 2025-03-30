import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './Payment.service';
import { CreatePaymentDto } from './createPayment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  async createPayment(@Body() body: CreatePaymentDto) {
    console.log(body);
    return await this.paymentService.createPayment(body.amount, body.order_id);
  }
}
